import mongoose, { Schema } from 'mongoose';
import { IPost } from "./Post";

export interface IChannel extends mongoose.Document {
    term_year: string,
    course_number: string,
    posts: [IPost]
}

const ChannelSchema = new mongoose.Schema({

    term_year: {
        type: String,
        required: true
    },

    course_number: {
        type: String,
        required: true
    },

    posts: {
        type: Array,
        required: true
    }

}, {
    timestamps: true
})

const Channel = mongoose.model<IChannel>("Channel", ChannelSchema);

export default Channel;