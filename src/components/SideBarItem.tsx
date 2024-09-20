import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SideBarItemProps {
  path: string;
  label: string;
  icon: any;
  isActive: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  path,
  label,
  icon,
  isActive,
}) => {
  return (
    <Link
      to={path}
      className={`p-2 rounded hover:text-[#2f8ce7] relative group ${
        isActive ? "text-[#2f8ce7]" : ""
      }`}
    >
      <div className="flex flex-row gap-5 items-center px-4">
        <FontAwesomeIcon icon={icon} />
        <p>{label}</p>
      </div>
      <div
        className={`absolute left-0 top-0 h-full w-1 bg-[#2f8ce7] transition-transform duration-300 ${
          isActive ? "scale-x-75" : "scale-x-0"
        }`}
      ></div>
    </Link>
  );
};

export default SideBarItem;
