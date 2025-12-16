import type { sentReqsResponse } from "./Types";

const getTitle = (location: string) => {
  const baseTitle = "GloboTalk | ";
  let title = "";
  if (location.length === 1 && location === "/") {
    title = capitalize("homepage");
  } else if (location.length > 1) {
    title = capitalize(location.split("/")[1]);
  }
  return `${baseTitle} ${title}`;
};

const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const getRandomAvatar = () => {
  const AvatarAPIUrl = import.meta.env.VITE_AVATAR_API_URL!;

  const seed = Math.random().toString(36).substring(2);
  const randomAvatar = `${AvatarAPIUrl}?seed=${seed}`;
  return randomAvatar;
};

const formatTo12HourDateTime = (isoString: string): string => {
  const date = new Date(isoString);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getSentReqIds = (
  sentReqs: sentReqsResponse | undefined,
  userId?: string
): Set<string> => {
  if (!sentReqs || !userId) return new Set();

  return new Set(
    sentReqs.sentFriendReqs
      .filter(
        (req) =>
          String(req.sender) === String(userId) && req.status === "pending"
      )
      .map((req) => String(req.recipient._id))
  );
};

export {
  capitalize,
  formatTo12HourDateTime,
  getRandomAvatar,
  getSentReqIds,
  getTitle,
};
