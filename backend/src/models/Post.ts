import mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
    author_name: string,
    title: string, 
    content: string,
    time_date: string
}

const PostSchema = new mongoose.Schema({

    author_name: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    time_date: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;