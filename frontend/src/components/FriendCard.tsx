import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../utils/constants";
import { MapPin } from "lucide-react";

const FriendCard = ({ friend }: { friend: any }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend?.profilePic} alt={friend?.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend?.fullName}</h3>
          {friend?.location && (
            <div className="flex text-center text-xs opacity-70 mt-1">
              <MapPin className="size-3 mr-1" />
              {friend?.location}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend?.nativeLanguage)}
            Native:{friend?.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend?.learningLanguage)}
            Learning:{friend?.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

export const getLanguageFlag = (language?: string) => {
  if (!language) return null;

  const langLower = language.toLowerCase();

  if (langLower in LANGUAGE_TO_FLAG) {
    const countryCode = LANGUAGE_TO_FLAG[langLower as LanguageKey];

    return (
      <img
        className="size-3 mr-2"
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
      />
    );
  }

  return null;
};
