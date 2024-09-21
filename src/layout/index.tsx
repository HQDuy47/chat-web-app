import { ReactNode, useState } from "react";
import Sidebar from "../components/SideBar";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-mono subpixel-antialiased">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col p-4">
        <div className="flex flex-row justify-between items-center pr-4 gap-4">
          <button
            className="text-gray-500 focus:outline-none lg:hidden"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div></div>
          <div className="flex flex-row gap-2 items-center pr-4 text-sm">
            <div className="flex flex-row items-center">
              <p>Status:</p>
              <div className="relative inline-block w-28">
                <select className="block appearance-none w-full bg-gray-100 px-2 pr-8 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="0">Sale</option>
                  <option value="1">Active</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
            <FontAwesomeIcon icon={faBell} className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 pt-4 pl-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
