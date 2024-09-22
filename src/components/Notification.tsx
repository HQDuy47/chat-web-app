import { useState, useEffect, useContext, useRef } from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ChatContext } from "../Context/chatContext";
import { ChatBox } from "../interfaces/interface";
import _ from "lodash";

const Notification = () => {
  const [showMenu, setShowMenu] = useState(false);
  const context = useContext(ChatContext);
  const [filteredMessages, setFilteredMessages] = useState<ChatBox[]>([]);
  const [seenMessages, setSeenMessages] = useState<{ [key: number]: boolean }>(
    {}
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (context) {
      const { chatBoxes } = context;

      const sorted = _.sortBy(chatBoxes, (chatbox) => {
        const latestMessageDate =
          chatbox.messages.length > 0
            ? new Date(chatbox.messages[0].date)
            : new Date("1970-01-01T00:00:00Z");
        return -latestMessageDate.getTime();
      });

      setFilteredMessages(sorted);
    }
  }, [context]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!context) {
    return null;
  }

  const handleSeen = (id: number) => {
    if (!seenMessages[id]) {
      setSeenMessages((prevSeenMessages) => ({
        ...prevSeenMessages,
        [id]: true,
      }));
    }

    context.markAsRead(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const unreadCount = filteredMessages.filter(
    (chatbox) => chatbox.isRead === false && !seenMessages[chatbox.id]
  ).length;

  return (
    <div className="relative">
      <div onClick={toggleMenu} className="cursor-pointer">
        <FontAwesomeIcon icon={faBell} className="h-5 w-5 text-gray-400" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            {unreadCount}
          </div>
        )}
      </div>
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3 z-50"
        >
          <h3 className="font-semibold text-lg">Notifications</h3>
          <ul>
            {filteredMessages.length === 0 ? (
              <li className="text-center text-gray-500 py-4">
                No notifications
              </li>
            ) : (
              filteredMessages.map((chatbox) => (
                <li
                  className="cursor-pointer hover:bg-gray-100 transition ease-in-out duration-100"
                  key={chatbox.id}
                  onClick={() => handleSeen(chatbox.id)}
                >
                  <Link to={`/room/${chatbox.id}`}>
                    <div
                      className={`flex justify-between items-center gap-4 py-2 px-1 rounded-sm`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <img
                            loading="lazy"
                            src={chatbox.avatar}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold text-xs">
                            {chatbox.name}
                          </p>
                          <p className="text-gray-600 text-xs truncate max-w-32">
                            You have a new message
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-gray-500 text-xs">
                          {formatDate(chatbox.messages[0].date)}
                        </p>
                        {chatbox.count > 0 && chatbox.isRead === false ? (
                          <div className="bg-red-500 w-3 h-3 flex items-center justify-center rounded-full text-center">
                            <p className="text-white font-bold text-xs">
                              {chatbox.count}
                            </p>
                          </div>
                        ) : (
                          <div className="h-4"></div>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
