import express from 'express';
import {register, login, getAllUsers, getUserByEmail, registerUsersFromFile, deleteUser, editUser, editUserCourses, checkValidAccount, getUserByObjectId, checkValidEmail} from '../controllers/userController';
import multer from "multer";

const upload = multer();

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:email").get(getUserByEmail);
router.route("/id/:id").get(getUserByObjectId);
router.route("/checkValidAccount/:email/:username").get(checkValidAccount);
router.route("/checkValidEmail/:email").get(checkValidEmail);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/upload").post(upload.single("csvFile"), registerUsersFromFile);
router.route("/:email/delete").delete(deleteUser)
router.route("/editUser/:email").put(editUser)
router.route("/editUserCourses/:email").put(editUserCourses)
export default router;