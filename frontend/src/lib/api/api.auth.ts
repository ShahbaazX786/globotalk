import type z from "zod";
import type { signupFormSchema } from "../schema/signup.schema";
import API from "./api.config";

const signupUser = async (payload: z.infer<typeof signupFormSchema>) => {
  const response = await API.post("/auth/signup", payload);
  return response.data;
};

export { signupUser };
