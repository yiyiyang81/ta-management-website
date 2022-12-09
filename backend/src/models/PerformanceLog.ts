import mongoose from 'mongoose';

export interface IPerformanceLog extends mongoose.Document {
    term_year: string,
    course_number: string,
    TA_name: string,
    TA_email: string,
    time_date_stamped_comments: [string],
}

const PerformanceLogSchema = new mongoose.Schema({

    term_year: {
        type: String,
        required: true
    },

    course_number: {
        type: String,
        required: true
    },

    TA_name: {
        type: String,
        required: true
    },

    TA_email: {
        type: String,
        required: true
    },

    time_date_stamped_comments: {
        type: Array,
        required: true
    }

}, {
    timestamps: true
})

const PerformanceLog = mongoose.model<IPerformanceLog>("PerformanceLog", PerformanceLogSchema);

export default PerformanceLog;