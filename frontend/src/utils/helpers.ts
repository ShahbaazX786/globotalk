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

export { getTitle };
