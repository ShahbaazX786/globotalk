import { VideoIcon } from "lucide-react";

const CallButton = ({ handleVideoCall }: { handleVideoCall: any }) => {
  return (
    <div className="p-3 border-b flex justify-end items-center max-w-7xl mx-auto w-full absolute top-0">
      <button
        className="btn btn-success btn-sm text-white"
        onClick={handleVideoCall}
      >
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
};

export default CallButton;
