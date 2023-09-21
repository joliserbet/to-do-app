import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    completed:{
        type: false
    },
    isEditing:{
        type: false,
    }
});

export default mongoose.model('Task', taskSchema);