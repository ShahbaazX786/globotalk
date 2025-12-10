import mongoose, { Document } from "mongoose";

interface IUser {
  fullName: string;
  email: string;
  password: string;
  bio?: string;
  profilePic?: string;
  location?: string;
  nativeLanguage?: string;
  learningLanguages?: string[];
  isOnboarded?: boolean;
  friendList?: mongoose.Types.ObjectId[];
}

interface IUserMethods {
  matchPassword(enteredPassword: string): Promise<boolean>;
}

type UserDocument = IUser & IUserMethods & Document;

export { UserDocument };
