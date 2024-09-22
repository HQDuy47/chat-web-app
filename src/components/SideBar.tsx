import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faAngleDown,
  faMessage,
  faCalendar,
  faTag,
  faFileLines,
  faGear,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import SideBarItem from "./SideBarItem";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAuthUser } from "../redux/apiRequest";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// const authUser = {
//   id: 1,
//   username: "Jimmy Hendrix",
//   avatarUrl:
//     "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww",
// };

const navItems = [
  { path: "/properties", label: "PROPERTIES", icon: faHouse },
  { path: "/", label: "CHAT", icon: faMessage },
  { path: "/calendar", label: "CALENDAR", icon: faCalendar },
  { path: "/offers", label: "OFFERS", icon: faTag },
  { path: "/documents", label: "DOCUMENTS", icon: faFileLines },
  { path: "/settings", label: "SETTINGS", icon: faGear },
];

export default function SideBar({ isOpen, toggleSidebar }: SideBarProps) {
  const authUser = useSelector(
    (state: any) => state?.authUser?.authUser?.currentUser
  );

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    getAuthUser(dispatch);
  }, [dispatch]);

  return (
    <div>
      <button
        className="fixed z-40 top-2 left-2 lg:hidden text-gray-500  rounded-full p-1 "
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
      </button>
      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`shadow-sm fixed inset-y-0 left-0 z-30 bg-[#dadaf6] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 py-4 ease-in-out lg:translate-x-0 lg:static lg:inset-0 h-screen w-full lg:w-52`}
      >
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="border-8 bg-white rounded-full p-1 shadow-xl">
            {authUser ? (
              <img
                loading="lazy"
                src={authUser.avatarUrl}
                className="h-16 w-16 object-cover rounded-full"
                alt="avatar"
              />
            ) : (
              <img
                loading="lazy"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
                className="h-16 w-16 object-cover rounded-full"
                alt="avatar"
              />
            )}
          </div>
          <div className="flex mt-2 gap-1 flex-row justify-center items-center text-black">
            <p className="text-black text-sm">
              {authUser ? authUser.username : "Jimmy Hendrix"}
            </p>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
        <nav className="flex flex-col space-y-4 mt-10 text-[#b9b9b9] text-sm font-bold">
          {navItems.map((item) => (
            <SideBarItem
              key={item.path}
              path={item.path}
              label={item.label}
              icon={item.icon}
              isActive={
                location.pathname === item.path ||
                (!navItems.some(
                  (navItem) => navItem.path === location.pathname
                ) &&
                  item.path === "/")
              }
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
