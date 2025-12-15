import { BellIcon, LogOutIcon, PhoneCall } from "lucide-react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../../lib/hooks/useAuthUser";
import { useLogout } from "../../lib/hooks/useMutations";
import ThemeSelector from "../Misc/ThemeSelector";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center justify-between">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center w-full gap-2">
          {isChatPage && (
            <div className="pl-5">
              <Link to={"/"} className="flex items-center gap-2.5">
                <PhoneCall className="size-8 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-widerk">
                  GloboTalk
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="size-6 text-basek-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <div className="avatar">
            <div className="w-8 rounded-full">
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                rel="noreferrer"
              />
            </div>
          </div>

          <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
            <LogOutIcon className="size-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
