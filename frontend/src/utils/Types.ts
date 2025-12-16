import type { LANGUAGE_TO_FLAG } from "./constants";

type User = {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
  bio: string;
  location: string;
  nativeLanguage: string;
  learningLanguage: string;
  isOnboarded: boolean;
  friendList: [];
};

type sentReqsResponse = {
  sentFriendReqs: sentFriendReqsType[];
};

type sentFriendReqsType = {
  _id: string;
  sender: string;
  recipient: Pick<
    User,
    "_id" | "fullName" | "profilePic" | "nativeLanguage" | "learningLanguage"
  >;
  status: "pending" | "accepted";
};

type SupportedLanguage = keyof typeof LANGUAGE_TO_FLAG;

export type { sentFriendReqsType, sentReqsResponse, SupportedLanguage, User };
