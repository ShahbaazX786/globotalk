import { z } from "zod";

const loginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email will you?" }),
  password: z
    .string()
    .min(8, {
      error: "Hmm, lets try again with 8 character password alright?",
    })
    .max(50, { error: "Whoa!! are you storing nuclear codes or what?" }),
});

export default loginFormSchema;
