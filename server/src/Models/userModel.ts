import mongoose from "mongoose"
import {Schema} from "mongoose"

export interface IUser extends Document{
    name:string,
    email:string,
    password:string
}
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export const UserModel=mongoose.model<IUser>("User",userSchema)