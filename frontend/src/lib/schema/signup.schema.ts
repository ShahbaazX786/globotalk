import { z } from "zod";

const signupFormSchema = z.object({
  fullName: z
    .string()
    .min(5, { error: "fullName must be atleast 5 characters long" })
    .max(100, {
      error: "Whoa calm down buddy, did you mistook fullName for your address?",
    }),
  email: z.email({ error: "Please enter a valid email will you?" }),
  password: z
    .string()
    .min(8, {
      error: "Hmm, lets try again with 8 character password alright?",
    })
    .max(50, { error: "Whoa!! are you storing nuclear codes or what?" }),
});

export default signupFormSchema;
