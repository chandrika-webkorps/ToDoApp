import mongoose from "mongoose"
import {Schema} from "mongoose"

export interface ITodo extends Document{
    title:string,
    description:string,
    done:boolean,
    user:mongoose.Types.ObjectId
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
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

export const UserModel=mongoose.model<ITodo>("Todo",todoSchema)