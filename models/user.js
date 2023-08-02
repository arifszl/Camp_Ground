import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
