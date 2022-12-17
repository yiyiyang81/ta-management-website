import express from 'express';
import {register, login, getAllUsers, getUserByEmail, registerUsersFromFile, deleteUser, editUser, editUserCourses} from '../controllers/userController';
import multer from "multer";

const upload = multer();

const router = express.Router();

router.route("/:email").get(getUserByEmail);
router.route("/").get(getAllUsers);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/upload").post(upload.single("csvFile"), registerUsersFromFile);
router.route("/:email/delete").delete(deleteUser)
router.route("/:email/editUser").put(editUser)
router.route("/:email/editUserCourses").put(editUserCourses)
export default router;