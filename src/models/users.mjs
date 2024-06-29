import mongoose, { Schema } from "mongoose";
import jwtSecret from "../config/jwt.mjs";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const usersSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email uniqueness
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    contactNo: Number,
    tokens: {
        default: [],
        type: [String] // Ensure tokens are strings
    }
});

// Hash password before saving the user
usersSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

usersSchema.methods.comparePassword = async function (password) {
    const user = this;

    return await bcrypt.compare(password, user.password);
};

usersSchema.methods.generateToken = function () {
    const { _id } = this;
    const token = jwt.sign({ _id }, jwtSecret);

    return token;
};

const Users = mongoose.model('users', usersSchema);

export default Users;
