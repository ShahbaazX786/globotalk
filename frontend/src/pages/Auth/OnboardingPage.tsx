import { zodResolver } from "@hookform/resolvers/zod";
import {
  CameraIcon,
  LoaderIcon,
  MapPinIcon,
  PhoneCall,
  ShuffleIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type z from "zod";
import useAuthUser from "../../lib/hooks/useAuthUser";
import { useOnboarding } from "../../lib/hooks/useMutations";
import onboardingFormSchema from "../../lib/schema/onboarding.schema";
import { useThemeStore } from "../../lib/store/theme.store";
import { LANGUAGES } from "../../utils/constants";

const OnboardingPage = () => {
  const { currentTheme } = useThemeStore();
  const { authUser } = useAuthUser();

  const { isPending, onboardMutation } = useOnboarding();

  const onboardingForm = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      fullName: authUser?.fullName ?? "",
      profilePic: authUser?.profilePic ?? "",
      bio: authUser?.bio ?? "",
      nativeLanguage: authUser?.nativeLanguage ?? "",
      learningLanguage: authUser?.learningLanguage ?? "",
      location: authUser?.location ?? "",
    },
  });

  const onFormSubmit = (data: z.infer<typeof onboardingFormSchema>) => {
    onboardMutation(data);
  };

  const generateRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    onboardingForm.setValue("profilePic", randomAvatar, {
      shouldValidate: true,
    });
    toast.success("Random Profile Picture Generated");
  };

  return (
    <section
      data-theme={currentTheme}
      id="OnboardingPage"
      className="min-h-screen bg-base-100 flex justify-center items-center p-4"
    >
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form
            onSubmit={onboardingForm.handleSubmit(onFormSubmit)}
            className="space-y-6"
          >
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {onboardingForm.getValues("profilePic") ? (
                  <img
                    src={onboardingForm.getValues("profilePic")}
                    alt="Profile Picture"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="btn btn-accent"
                  type="button"
                  onClick={generateRandomAvatar}
                >
                  {" "}
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="fullName" className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                id="fullName"
                className="input input-bordered w-full"
                placeholder="Your Full Name"
                {...onboardingForm.register("fullName")}
              />
            </div>
            <div className="form-control">
              <label htmlFor="bio" className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                id="bio"
                className="textarea textarea-bordered w-full h-24"
                placeholder="Tell others about yourself and your language learning goals..."
                {...onboardingForm.register("bio")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label htmlFor="nativeLanguage" className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  id="nativeLanguage"
                  className="select select-bordered w-full"
                  {...onboardingForm.register("nativeLanguage")}
                >
                  {LANGUAGES.map((language) => (
                    <option
                      key={`native-${language}`}
                      value={language.toLowerCase()}
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label htmlFor="learningLanguage" className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  id="learningLanguage"
                  className="select select-bordered w-full"
                  {...onboardingForm.register("learningLanguage")}
                >
                  {LANGUAGES.map((language) => (
                    <option
                      key={`learning-${language}`}
                      value={language.toLowerCase()}
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="location" className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  id="location"
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country ..."
                  {...onboardingForm.register("location")}
                />
              </div>
            </div>

            <button
              className="btn btn-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <PhoneCall className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="size-5 mr-2 animate-spin" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OnboardingPage;
