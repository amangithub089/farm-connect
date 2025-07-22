// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["Farmer", "Buyer"],
        required: true
    },
    phone: String,
    address: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);
