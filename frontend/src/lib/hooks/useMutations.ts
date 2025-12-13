import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type z from "zod";
import { loginUser, signupUser } from "../api/api.auth";
import type loginFormSchema from "../schema/login.schema";
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

  return { isPending, error, loginMutation: mutate };
};

export { useLogin, useSignup };
