const getTitle = (location: string) => {
  let baseTitle = "GloboTalk | ";
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

export { formatTo12HourDateTime, getRandomAvatar, getTitle };
