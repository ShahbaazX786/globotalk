import { LANGUAGE_TO_FLAG } from "../utils/constants";
import type { SupportedLanguage } from "../utils/Types";

const getLanguageFlag = (language?: string) => {
  if (!language) return null;

  const langLower = language.toLowerCase() as SupportedLanguage;

  const countryCode = LANGUAGE_TO_FLAG[langLower];
  if (!countryCode) return null;

  return (
    <img
      className="size-3 mr-2"
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`${langLower} flag`}
    />
  );
};

export default getLanguageFlag;
