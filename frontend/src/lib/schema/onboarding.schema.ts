import { z } from "zod";

const onboardingFormSchema = z.object({
  fullName: z.string().min(5).max(100),
  profilePic: z.string(),
  bio: z.string().max(256),
  nativeLanguage: z.string(),
  learningLanguage: z.string(),
  location: z.string(),
});

export default onboardingFormSchema;
