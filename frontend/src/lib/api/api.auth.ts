import type z from "zod";
import type loginFormSchema from "../schema/login.schema";
import type onboardingFormSchema from "../schema/onboarding.schema";
import type signupFormSchema from "../schema/signup.schema";
import API from "./api.config";

const getAuthUser = async () => {
  try {
    const res = await API.get("/auth/me");
    return res.data;
  } catch (error) {
    console.error("Error in getAuthUser:", error);
    return null;
  }
};

const signupUser = async (payload: z.infer<typeof signupFormSchema>) => {
  const response = await API.post("/auth/signup", payload);
  return response.data;
};

const loginUser = async (payload: z.infer<typeof loginFormSchema>) => {
  const response = await API.post("/auth/login", payload);
  return response.data;
};

const logoutUser = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};

const completeOnboarding = async (
  payload: z.infer<typeof onboardingFormSchema>
) => {
  const response = await API.post("/auth/onboard", payload);
  return response.data;
};

export { completeOnboarding, getAuthUser, loginUser, logoutUser, signupUser };
