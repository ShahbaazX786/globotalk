import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type z from "zod";
import {
  completeOnboarding,
  loginUser,
  logoutUser,
  signupUser,
} from "../api/api.auth";
import type loginFormSchema from "../schema/login.schema";
import type onboardingFormSchema from "../schema/onboarding.schema";
import type signupFormSchema from "../schema/signup.schema";

const useSignup = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: z.infer<typeof signupFormSchema>) => signupUser(data),
    onMutate: () => {
      toast.loading("Creating Your Account");
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.dismiss();
        toast.success("Account Created Sucessfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err: any) => {
      toast.dismiss();
      toast.error(err?.response?.data?.message);
      console.error("Error while creating an account:", err);
    },
  });

  return { isPending, error, signUpMutation: mutate };
};

const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: z.infer<typeof loginFormSchema>) => loginUser(data),
    onMutate: () => {
      toast.loading("Logging In...");
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.dismiss();
        toast.success("User Logged In Sucessfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err: any) => {
      toast.dismiss();
      toast.error(err?.response?.data?.message);
      console.error("Error while creating an account:", err);
    },
  });

  return { isPending, error, loginMutation: mutate };
};

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => logoutUser(),
    onMutate: () => {
      toast.loading("Logging out user...");
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.dismiss();
        toast.success("User Logged Out Sucessfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err: any) => {
      toast.dismiss();
      toast.error(err?.response?.data?.message);
      console.error("Error while logging out user:", err);
    },
  });

  return { isPending, error, logoutMutation: mutate };
};

const useOnboarding = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: z.infer<typeof onboardingFormSchema>) =>
      completeOnboarding(data),
    onMutate: () => {
      toast.loading("Saving your profile details");
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.dismiss();
        toast.success("Profile Updated Sucessfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err: any) => {
      toast.dismiss();
      toast.error(err?.response?.data?.message);
      console.error("Error while onboarding user:", err);
    },
  });

  return { isPending, error, onboardMutation: mutate };
};

export { useLogin, useLogout, useOnboarding, useSignup };
