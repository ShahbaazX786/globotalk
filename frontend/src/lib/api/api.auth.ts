import type z from "zod";
import type { signupFormSchema } from "../schema/signup.schema";
import API from "./api.config";

const getAuthUser = async () => {
  const res = await API.get("/auth/me");
  return res.data;
};

const signupUser = async (payload: z.infer<typeof signupFormSchema>) => {
  const response = await API.post("/auth/signup", payload);
  return response.data;
};

export { getAuthUser, signupUser };
