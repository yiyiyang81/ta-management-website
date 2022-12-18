import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User, { UserTypes } from "../models/User";
import generateToken from "../utils/generateToken";
import { parse } from 'csv-string';
import { UserHelper } from "../helpers/userHelper";
import { CourseHelper } from "../helpers/courseHelper";

// @Desc Get all users
// @Route /api/users
// @Method GET
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserHelper.getAllUsersDb(false);
  res.status(200).json({
    users
  });
});

// @Desc Save multiple users
// @Route /api/users/upload
// @Method POST
export const registerUsersFromFile = asyncHandler(async (req: Request, res: Response) => {
  const csv = req.file;
  if (csv) {
    const fileContent = parse(csv.buffer.toString('utf-8'));
    for (let record of fileContent) {
        const first_name = record[0]
        const last_name = record[1]
        const email = record[2]
        const username = await UserHelper.generateUsername(first_name, last_name, 1)
        const password = record[3]
        const userTypes = record[4].split("/") as UserTypes[]
        await UserHelper.createSkeletonUserDb(first_name, last_name, email, username, password, userTypes)
    }
  } else {
    res.status(500);
    throw new Error("File upload unsuccessful.");
  }
  res.status(200).send();
});


// @Desc Get User by email
// @Route /api/users/:email
// @Method GET
export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserHelper.getUserDbByEmail(req.params.email, false)
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({
    user
  });
});

// @Desc Check if email or username is already used by a User
// @Route /api/users/checkValidAccount/:email/:username
// @Method GET
export const checkValidAccount = asyncHandler(async (req: Request, res: Response) => {
  const email = await User.exists({email: req.params.email})
  const username = await User.exists({username: req.params.username})
  let emailExists = false
  let usernameExists = false
  if (email) {
    emailExists = true
  }
  if (username) {
    usernameExists = true
  }
  res.status(200).json({
    emailExists: emailExists,
    usernameExists: usernameExists
  });
});


// @Desc Register User
// @Route /api/users/register
// @Method POST
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { first_name, last_name, email, username, password, student_id, term, year, registered_courses, roles } = req.body;
  let semester = ""
  if (term! != "default" && year != "default") {
    semester = term + " " + year
  }
  const converted_registered_courses = await CourseHelper.getCoursesIdsByCourseNumbers(registered_courses)
  const user = await UserHelper.createUserDb(first_name, last_name, email, student_id, username, password, converted_registered_courses, semester, roles) 

  res.status(200).json({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    student_id: user.student_id,
    username: user.username,
    registered_courses: user.registered_courses,
    semester: user.semester,
    user_types: user.user_types,
    token: generateToken(user._id)
  });
});


// @Desc Login user
// @Route /api/users/login
// @Method POST
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({email: email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (await user.compare_password(password)) {
    res.status(200).json({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      user_types: user.user_types,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error("Email or password incorrect");
  }
})

async function validateUserByEmail(req: Request, res: Response): Promise<void> {
  const user = await UserHelper.getUserDbByEmail(req.body.email, false)
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
}

// @Desc Delete user by email
// @Route /api/users/:email/delete
// @Method DELETE
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await validateUserByEmail(req, res)
  await UserHelper.deleteUserDbByEmail(req.params.email)
  res.status(200).send();
})

// @Desc Edit user information
// @Route /api/users/:email/editUser
// @Method PUT
export const editUser = asyncHandler(async (req: Request, res: Response) => {
  await validateUserByEmail(req, res)
  const { first_name, last_name, email, username, password, student_id, term, year, registered_courses, roles } = req.body;

  let semester = ""
  if (term != "default" && year != "default") {
    semester = term + " " + year
  }
  const filter = { email: req.params.email }
  const update = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    student_id: student_id,
    username: username,
    password: password,
    registered_courses: await CourseHelper.getCoursesIdsByCourseNumbers(registered_courses),
    semester: semester,
    user_types: roles,
  }

  await User.findOneAndUpdate(filter, update);
  res.status(200).send();
})

// @Desc Edit a user's registered courses
// @Route /api/users/:email/editUserCourses
// @Method PUT
export const editUserCourses = asyncHandler(async (req: Request, res: Response) => {
  await validateUserByEmail(req, res)
  const { term, year, registered_courses } = req.body;

  let semester = ""
  if (term != "default" && year != "default") {
    semester = term + " " + year
  }
  const filter = { email: req.params.email }
  const update = {
    registered_courses: await CourseHelper.getCoursesIdsByCourseNumbers(registered_courses),
    semester: semester
  }
  await User.findOneAndUpdate(filter, update);
  res.status(200).send();
});


