// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  picture: {
    type: String,
  },
  perfil: {
    description: { type: String, default: "" },
    favoriteBooks: { type: [String], default: ["", "", ""] },
    readingRecommendations: { type: [String], default: [""] },
    link: { type: String, default: "" },
    socialLinks: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
