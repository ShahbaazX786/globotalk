import { useEffect } from "react";
import { useLocation } from "react-router";
import { PageTitle } from "../../utils/constants";
import { getTitle } from "../../utils/helpers";

const usePageTitle = () => {
  let title = PageTitle;
  const location = useLocation();

  useEffect(() => {
    const updatedTitle = getTitle(location?.pathname);
    if (updatedTitle) {
      document.title = updatedTitle;
    } else {
      document.title = title;
    }
  }, [location]);
};

export default usePageTitle;
