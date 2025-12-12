import { ShipWheelIcon } from "lucide-react";
import { useState } from "react";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

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

          <div className="w-full">
            <form></form>
          </div>
        </section>
        <section
          id="right-section"
          className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col"
        ></section>
      </div>
    </section>
  );
};

export default SignUpPage;
