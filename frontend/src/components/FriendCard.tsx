import { CheckCircleIcon, MapPin, UserPlusIcon } from "lucide-react";
import { Link } from "react-router";
import { useSendFriendReq } from "../lib/hooks/queries/mutations/useFriendMutation";
import { cn } from "../utils/classMerge";
import { capitalize } from "../utils/helpers";
import type { User } from "../utils/Types";
import getLanguageFlag from "./Flag";

const FriendCard = ({
  friend,
  size,
  isFriends,
  reqSent,
}: {
  friend: User;
  size: "sm" | "lg";
  isFriends: boolean;
  reqSent: boolean;
}) => {
  const { isPending, sendFriendReq } = useSendFriendReq();

  const handleSendFriendReq = (id: string) => {
    sendFriendReq(id);
  };
  console.warn(friend);

  return (
    <div
      className={cn(
        "card w-full",
        size === "sm"
          ? "bg-base-200 hover:shadow-md transition-shadow"
          : "caret-blue-200 hover:shadow-lg transition-all duration-300"
      )}
    >
      <div
        className={cn(
          "card-body",
          size === "sm" ? "p-4" : "p-5 space-y-2 border rounded-xl"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "avatar",
              size === "sm" ? "size-12" : "size-16 rounded-full"
            )}
          >
            <img
              src={friend?.profilePic}
              alt={friend?.fullName}
              loading="eager"
              className="border-2 rounded-full"
            />
          </div>
          <div>
            <h3
              className={cn(
                "font-semibold",
                size === "sm" ? "truncate text-base" : "text-xl"
              )}
            >
              {friend?.fullName}
            </h3>
            {friend?.location && (
              <div className="flex justify-center items-baseline text-sm opacity-70 mt-1">
                <MapPin className="size-3 mr-1" />
                {friend?.location}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-start items-center flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs px-2 py-3 ">
            {getLanguageFlag(friend?.nativeLanguage)} Native:
            {capitalize(friend?.nativeLanguage)}
          </span>
          <span className="badge badge-outline text-xs px-2 py-3">
            {getLanguageFlag(friend?.learningLanguage)}
            Learning:{capitalize(friend?.learningLanguage)}
          </span>
        </div>

        {friend?.bio && <p className="text-sm opacity-70">{friend?.bio}</p>}

        {isFriends ? (
          <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
            Message
          </Link>
        ) : (
          <button
            className={cn(
              "btn w-full mt-2",
              reqSent ? "btn-disabled" : "btn-primary"
            )}
            onClick={() => handleSendFriendReq(friend._id)}
            disabled={reqSent || isPending}
          >
            {reqSent ? (
              <>
                <CheckCircleIcon className="size-4 mr-2" /> Request Sent
              </>
            ) : (
              <>
                <UserPlusIcon className="size-4 mr-2" /> Send Friend Request
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
