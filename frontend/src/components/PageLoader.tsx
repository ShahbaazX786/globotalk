import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../lib/store/theme.store";

const PageLoader = () => {
  const { currentTheme } = useThemeStore();
  return (
    <div
      className="min-h-screen flex justify-center items-center"
      data-theme={currentTheme}
    >
      <LoaderIcon className="size-10 animate-spin text-primary" />
    </div>
  );
};

export default PageLoader;
