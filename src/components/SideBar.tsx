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
} from "@fortawesome/free-solid-svg-icons";
import SideBarItem from "./SideBarItem";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navItems = [
  { path: "/properties", label: "PROPERTIES", icon: faHouse },
  { path: "/", label: "CHAT", icon: faMessage },
  { path: "/calendar", label: "CALENDAR", icon: faCalendar },
  { path: "/offers", label: "OFFERS", icon: faTag },
  { path: "/documents", label: "DOCUMENTS", icon: faFileLines },
  { path: "/settings", label: "SETTINGS", icon: faGear },
];

export default function SideBar({ isOpen, toggleSidebar }: SideBarProps) {
  const location = useLocation();

  return (
    <div>
      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 bg-[#dadaf6] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 py-4 ease-in-out lg:translate-x-0 lg:static lg:inset-0 h-screen w-full lg:w-52`}
      >
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="border-8 bg-white rounded-full p-1 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
              alt="Sidebar Banner"
              className="h-16 w-16 object-cover rounded-full"
            />
          </div>
          <div className="flex mt-2 gap-1 flex-row justify-center items-center text-black">
            <p className="text-black text-sm">Jimmy Hendrix</p>
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
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
