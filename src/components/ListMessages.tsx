import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function ListMessages() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search bar */}
      <div className="flex items-center space-x-2 border-b border-gray-300 py-1 px-4 mt-[14px] ">
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
          {filteredMessages.map((message) => (
            <li
              className="mt-3 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              key={message.id}
            >
              <div className="flex justify-between items-center gap-4 p-3 bg-white rounded shadow-sm hover:bg-gray-100 transition ease-in-out duration-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={message.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold">{message.name}</p>
                    <p className="text-gray-600 text-sm truncate max-w-32">
                      {message.content}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-gray-500 text-sm">{message.date}</p>
                  {message.count > 0 ? (
                    <div className="bg-red-500 w-4 h-4 flex items-center justify-center rounded-full text-center">
                      <p className="text-white font-bold text-xs">
                        {message.count}
                      </p>
                    </div>
                  ) : (
                    <div className="h-4"></div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const messages = [
  {
    id: 1,
    name: "Jimmy Hendrix",
    content: "Let's meet tomorrow.",
    avatar:
      "https://images.unsplash.com/photo-1706885093476-b1e54f3b7496?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "02 Feb",
    count: 3,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    content: "I'll send you the files soon.",
    avatar:
      "https://plus.unsplash.com/premium_photo-1664541336816-2a2987114ca4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "02 Feb",
    count: 2,
  },
  {
    id: 3,
    name: "Michael Scott",
    content: "Did you finish the report?",
    avatar:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "03 Feb",
    count: 0,
  },
  {
    id: 4,
    name: "Dwight Schrute",
    content: "Beets are the best!",
    avatar:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "04 Feb",
    count: 0,
  },
  {
    id: 5,
    name: "Pam Beesly",
    content: "Let's have lunch tomorrow.",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "05 Feb",
    count: 5,
  },
  {
    id: 6,
    name: "Jim Halpert",
    content: "Let me know about the meeting.",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "06 Feb",
    count: 0,
  },
  {
    id: 7,
    name: "Jim Halpert",
    content: "Let me know about the meeting.",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "06 Feb",
    count: 2,
  },
];
