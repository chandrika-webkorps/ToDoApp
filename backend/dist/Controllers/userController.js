import { generateToken } from "../../dist/middlewares/jwtAuth.js";
import { UserModel } from "../Models/userModel.js";
import bcrypt from "bcrypt";
export const addUser = async (req, res) => {
    try {
        const values = req.body;
        if (!values.email || !values.password) {
            return res.status(404).json({ message: "All fields are required" });
        }
        const existingUser = await UserModel.findOne({ email: values.email });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists, please login", existingUser });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(values.password, saltRounds);
        const newUser = new UserModel({
            name: values.name,
            email: values.email,
            password: hashedPassword
        });
        await newUser.save();
        console.log("newUser: ",newUser);
        
        return res.status(200).json({ message: "New user created", newUser });
    }
    catch (err) {
        console.log("Error in creating a new user: ", err);
        return res.status(500).json({ message: "Error creating a new user", details: err });
    }
};
export const loginUser = async (req, res) => {
    try {
        const values = req.body;
        let token;
        if (!values.email || !values.password) {
            return res.status(404).json({ message: "All fields are required" });
        }
        const existingUser = await UserModel.findOne({ email: values.email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found please signup" });
        }
        const isValidPassword = await bcrypt.compare(values.password, existingUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        token = generateToken({
            id: existingUser._id.toString(),
            email: existingUser.email
        });
        return res.status(200).json({ message: "Login Successful ", token });
    }
    catch (err) {
        console.log("Error logging in: ", err);
        return res.status(500).json({ message: "Error logging in ", details: err });
    }
};
