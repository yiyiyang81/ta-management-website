import mongoose from 'mongoose';

export interface ITAWishlist extends mongoose.Document {
    next_term_year: string;
    course_number: string;
    TA_names: [string];
    TA_emails: [string];
    instructor_name: string;
    instructor_email: string;
}

const TAWishlistSchema = new mongoose.Schema({

    next_term_year: {
        type: String,
        required: true,
    },

    course_number: {
        type: String,
        required: true,
    },

    TA_names: {
        type: Array,
        required: true,
    },

    TA_emails: {
        type: Array,
        required: true,
    },

    instructor_name: {
        type: String,
        required: true,
    },

    instructor_email: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
})

const TAWishlist = mongoose.model<ITAWishlist>("TAWishlist", TAWishlistSchema);

export default TAWishlist;