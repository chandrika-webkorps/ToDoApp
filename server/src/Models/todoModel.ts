import mongoose from "mongoose"
import {Schema} from "mongoose"

export interface ITodo extends Document{
    title:string,
    description:string,
    done:boolean,
    userId:mongoose.Types.ObjectId
}
const todoSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    done:{
        type:Boolean,
        required:true,
        default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

export const TodoModel=mongoose.model<ITodo>("Todo",todoSchema)