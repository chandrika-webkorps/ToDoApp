import mongoose from "mongoose";
import { Schema } from "mongoose";
const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
export const ToDoModel = mongoose.model("Todo", todoSchema);
