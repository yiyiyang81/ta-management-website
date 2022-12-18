import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Channel from "../models/Channel";
import Post from "../models/Post";

// @Desc Create a channel for a course for the given term_year
// @Route /api/channel/create
// @Method POST
export const createChannel = asyncHandler(async (req: Request, res: Response) => {
    const { term_year, course_number } = req.body;

    const channel = await Channel.findOne({ term_year: term_year, course_number: course_number });

    if (!channel) {
        const posts = Array();
        const new_channel = new Channel({ term_year: term_year, course_number: course_number, posts: posts });
        new_channel.save();

        res.status(201).json({ 
            id: new_channel._id,
            term_year: new_channel.term_year,
            course_number: new_channel.course_number,
            posts: new_channel.posts
        });
    } else {
        res.status(200).json({}); // channel already created
    }
})

// @Desc Add a post to the course channel
// @Route /api/channel/post
// @Method POST
export const addPost = asyncHandler(async (req: Request, res: Response) => {
    const { term_year, course_number, author_name, title, content, time_date } = req.body;

    const channel = await Channel.findOne({ term_year: term_year, course_number: course_number });

    if (!channel) {
        res.status(404);
        throw new Error("Channel not created yet or invalid")
    } else {
        const post = new Post({ author_name: author_name, title: title, content: content, time_date: time_date });
        post.save();
        channel.posts.push(post);
        channel.save();

        res.status(200).json({
            author_name: post.author_name,
            title: post.title,
            content: post.content,
            time_date: post.time_date
        })
    }
});

// @Desc Get all posts of a channel
// @Route /api/channel/posts
// @Method GET
export const getPosts = asyncHandler(async (req: Request, res: Response) => {
    const term_year = req.query.term_year;
    const course_number = req.query.course_number;

    const channel = await Channel.findOne({ term_year: term_year, course_number: course_number });

    if (!channel) {
        res.status(404);
        throw new Error("Channel not created yet")
    } else {
        res.status(200).json({ posts: channel.posts });
    }
});