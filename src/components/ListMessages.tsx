import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ChatContext } from "../Context/chatContext";
import { ChatBox } from "../interfaces/interface";

export default function ListMessages() {
  const [searchQuery, setSearchQuery] = useState("");
  const context = useContext(ChatContext);

  const [filteredMessages, setFilteredMessages] = useState<ChatBox[]>([]);

  useEffect(() => {
    if (context) {
      const { chatBoxes } = context;

      // Filter and sort messages
      const filtered = chatBoxes
        .filter((chatbox) =>
          chatbox.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          const latestMessageA =
            a.messages.length > 0
              ? new Date(a.messages[0].date) // Sort by the first (newest) message
              : new Date("1970-01-01T00:00:00Z");
          const latestMessageB =
            b.messages.length > 0
              ? new Date(b.messages[0].date) // Sort by the first (newest) message
              : new Date("1970-01-01T00:00:00Z");
          return latestMessageB.getTime() - latestMessageA.getTime(); // Sort in descending order
        });

      setFilteredMessages(filtered); // Update the filtered messages state
    }
  }, [context, searchQuery]); // Include chatBoxes in the dependencies

  if (!context) {
    return null; // Handle loading or error appropriately
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };
    return date.toLocaleDateString("en-US", options); // Sử dụng ngôn ngữ tiếng Anh
  };

  return (
    <div>
      {/* Search bar */}
      <div className="flex items-center space-x-2 border-b border-gray-300 py-1 px-4 mt-[14px]">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="w-[90%] ml-4 h-[1px] bg-gray-200 text-center"></div>
      <div className="max-h-[420px] overflow-y-auto scrollbar-thin px-4">
        <ul>
          {filteredMessages.map((chatbox) => (
            <li
              className="mt-3 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              key={chatbox.id}
            >
              <Link to={`/room/${chatbox.id}`}>
                <div className="flex justify-between items-center gap-4 p-3 bg-white rounded shadow-sm hover:bg-gray-100 transition ease-in-out duration-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={chatbox.avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">{chatbox.name}</p>
                      <p className="text-gray-600 text-sm truncate max-w-32">
                        {chatbox.messages.length > 0
                          ? chatbox.messages[0].content
                          : "No messages"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-gray-500 text-sm">
                      {formatDate(chatbox.date)}
                    </p>
                    {chatbox.count > 0 ? (
                      <div className="bg-red-500 w-4 h-4 flex items-center justify-center rounded-full text-center">
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
          ))}
        </ul>
      </div>
    </div>
  );
}
