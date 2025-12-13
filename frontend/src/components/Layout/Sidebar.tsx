import { Link, useLocation } from "react-router";
import useAuthUser from "../../lib/hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
import { cn } from "../../utils/classMerge";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-base-300">
        <Link to={"/"} className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-8 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-widerk">
            GloboTalk
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          to={"/"}
          className={cn(
            "btn btn-ghost justify-start w-full gap-3 normal-case",
            currentPath === "/" ? "btn-active" : ""
          )}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>
        <Link
          to={"/friends"}
          className={cn(
            "btn btn-ghost justify-start w-full gap-3 normal-case",
            currentPath === "/friends" ? "btn-active" : ""
          )}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>
        <Link
          to={"/notifications"}
          className={cn(
            "btn btn-ghost justify-start w-full gap-3 normal-case",
            currentPath === "/notifications" ? "btn-active" : ""
          )}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-success text-xs flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
