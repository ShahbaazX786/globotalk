import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { getStreamToken } from "../../lib/api/api.chat";
import useAuthUser from "../../lib/hooks/useAuthUser";
import PageLoader from "../../components/Misc/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [videoClient, setVideoClient] = useState<any>(null);
  const [call, setCall] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const { authUser } = useAuthUser();

  const { data: tokenData, isLoading } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        console.log("Initializing stream video client...");

        const user = {
          id: authUser?._id,
          name: authUser?.fullName,
          image: authUser?.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData?.token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        console.log("Joined Call Sucessfully");

        setVideoClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };
    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <section
      id="Call-Page"
      className="flex flex-col justify-center items-center h-screen"
    >
      <div className="relative">
        {videoClient && call ? (
          <StreamVideo client={videoClient}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>
              Could not initialize the call. Please refresh or try again later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  if (callingState === CallingState.LEFT) {
    return <PageLoader />;
  }
  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
