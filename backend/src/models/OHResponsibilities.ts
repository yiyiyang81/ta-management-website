import mongoose from 'mongoose';

export interface IOHResponsibilties extends mongoose.Document {
    term_year: string;
    course_number: string;
    is_instructor: boolean;
    full_name: string;
    email: string;
    office_hours: string;
    location: string;
    responsibilities: [string];
}

const OHResponsibilitiesSchema = new mongoose.Schema({

    term_year: {
        type: String,
        required: true,
    },

    course_number: {
        type: String,
        required: true,
    },

    is_instructor: {
        type: Boolean,
        required: true,
    },

    full_name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    office_hours: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    responsibilities: {
        type: [String],
        required: true,
    }

}, {
    timestamps: true
})

const OHResponsibilities = mongoose.model<IOHResponsibilties>("OHResponsibilities", OHResponsibilitiesSchema);

export default OHResponsibilities;