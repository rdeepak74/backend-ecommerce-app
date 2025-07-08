import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res, next) => {

    try {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const userExits = await User.findOne({ email });

        if (userExits) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(user._id);
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
            token,
        });

    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token,
        });

    } catch (error) {
        next(error);
    }
}

export const getMe = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        next(error);
    }
}

// export const logout = async (req, res, next) => {
//     try {
//         res.cookie("token", null, {
//             expires: new Date(Date.now()),
//             httpOnly: true,
//         });
//         res.status(200).json({
//             success: true,
//             message: "User logged out successfully",
//         });
//     } catch (error) {
//         next(error);
//     }
// }