import express from 'express';
import { addPost, getChannel, getPosts, createChannel } from '../controllers/channelController';

const router = express.Router();

router.route("/create").post(createChannel);
router.route("/post").post(addPost);
router.route("/get").get(getChannel);
router.route("/posts").get(getPosts);

export default router;