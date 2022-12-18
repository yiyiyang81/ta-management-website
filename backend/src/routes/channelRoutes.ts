import express from 'express';
import { addPost, getPosts, createChannel } from '../controllers/channelController';

const router = express.Router();

router.route("/create").post(createChannel);
router.route("/post").post(addPost);
router.route("/allposts").get(getPosts);

export default router;