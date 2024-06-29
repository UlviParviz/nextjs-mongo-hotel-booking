import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  createdAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Your password must be longer than 8 characters"],
    match: [
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one number and one uppercase letter",
    ],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encrypting password before saving the user
userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error: any) {
    return next(error);
  }
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
