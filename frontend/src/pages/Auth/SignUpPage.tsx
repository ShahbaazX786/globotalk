import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShipWheelIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router";
import z from "zod";
import { signupUser } from "../../lib/api/api.auth";
import { signupFormSchema } from "../../lib/schema/signup.schema";
import { cn } from "../../utils/classMerge";

const SignUpPage = () => {
  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
  });
  const formErrors = signupForm.formState.errors;
  const queryClient = useQueryClient();

  const {
    mutate: signUpMutation,
    isPending,
    error,
  } = useMutation({
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

  const onFormSubmit = (data: z.infer<typeof signupFormSchema>) => {
    signUpMutation(data);
    console.log(data);
  };

  return (
    <section
      className="w-full h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="w-full max-w-5xl mx-auto bg-base-100 border border-primary/25 flex flex-col lg:flex-row rounded-xl shadow-lg overflow-hidden">
        <section
          id="left-section"
          className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col"
        >
          <div className="mb-4 flex justify-start items-center gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="font-bold font-mono text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              GloboTalk
            </span>
          </div>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error?.response?.data?.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={signupForm.handleSubmit(onFormSubmit)}>
              <div>
                <h2 className="text-xl font-semibold">Create an account</h2>
                <p className="text-sm opacity-75">
                  Join GloboTalk and start your language learning adventure!
                </p>
              </div>

              <div className="space-y-3">
                <div className="form-control w-full">
                  <label htmlFor="fullName" className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    id="fullName"
                    placeholder="Son Goku"
                    type="text"
                    className={cn(
                      "input w-full",
                      formErrors.fullName
                        ? "border-error focus:border-error"
                        : "input-bordered"
                    )}
                    {...signupForm.register("fullName")}
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-xs mt-2 ml-2">
                      {formErrors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="form-control w-full">
                  <label htmlFor="email" className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id="email"
                    placeholder="songoku@dbz.com"
                    type="email"
                    className={cn(
                      "input w-full",
                      formErrors.email
                        ? "border-error focus:border-error"
                        : "input-bordered"
                    )}
                    {...signupForm.register("email")}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-2 ml-2">
                      {formErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="form-control w-full">
                  <label htmlFor="password" className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    id="password"
                    placeholder="SuperSaiyan4"
                    type="password"
                    className={cn(
                      "input w-full",
                      formErrors.password
                        ? "border-error focus:border-error"
                        : "input-bordered"
                    )}
                    {...signupForm.register("password")}
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-xs mt-2 ml-2">
                      {formErrors.password.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label
                    htmlFor="termsAndConditions"
                    className="label cursor-pointer justify-start gap-2"
                  >
                    <input
                      id="termsAndConditions"
                      placeholder="SuperSaiyan4"
                      type="checkbox"
                      className="checkbox checkbox-sm"
                    />
                    <span className="text-xs leading-tight">
                      I agree to the{" "}
                      <span className="text-primary hover:underline">
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary hover:underline">
                        privacy policy
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <button className="btn btn-primary w-full" type="submit">
                {isPending ? "Signing Up..." : "Create Account"}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account{" "}
                  <Link to={"/login"} className="text-primary hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>

        <section
          id="right-section"
          className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 justify-center items-center"
        >
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="signup.png"
                alt="Signup Page Illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default SignUpPage;
