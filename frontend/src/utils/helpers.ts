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

export { getRandomAvatar, getTitle };
