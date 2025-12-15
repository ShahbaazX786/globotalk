import { Construction } from "lucide-react";

const UnderConstruction = () => {
  return (
    <div className="card bg-base-200 p-8 text-center border border-base-300 w-full h-full">
      <div className="flex justify-center  mb-4">
        <Construction className="w-10 h-10 text-primary" />
      </div>

      <h3 className="font-semibold text-lg mb-2">
        This Section Is Under Construction
      </h3>

      <p className="text-base-content opacity-70">
        We’re building something awesome here. Check back soon 🚀
      </p>
    </div>
  );
};

export default UnderConstruction;
