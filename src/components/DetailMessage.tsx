import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { ChatContext } from "../Context/chatContext";

export default function DetailMessage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const context = useContext(ChatContext);

  const [messageContent, setMessageContent] = useState("");

  if (!context) {
    return null; // or handle the error appropriately
  }

  const { chatBoxes, setChatBoxes } = context;

  const detailChatBox = chatBoxes.find((box) => box.id === numericId);
  const messages = detailChatBox ? detailChatBox.messages : [];

  const handleSendMessage = async () => {
    if (messageContent.trim() !== "") {
      const newMessage = {
        idMess: messages.length + 1,
        isSender: true,
        name: "User",
        content: messageContent,
        avatar: "path/to/avatar",
        date: new Date().toISOString(),
        count: 1,
      };

      const updatedChatBoxes = chatBoxes.map((box) => {
        if (box.id === numericId) {
          return {
            ...box,
            messages: [newMessage, ...box.messages],
          };
        }
        return box;
      });

      setChatBoxes(updatedChatBoxes);
      localStorage.setItem("chatBoxes", JSON.stringify(updatedChatBoxes));
      setMessageContent("");
    }
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem("chatBoxes");
    setChatBoxes([]);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }; // 24-hour format
    return date.toLocaleTimeString("en-US", options); // Sử dụng ngôn ngữ tiếng AnhƯ
  };

  return (
    <div className="px-4">
      {detailChatBox ? (
        <>
          <div className="py-1">
            <p className="text-lg font-semibold">{detailChatBox.nameChat}</p>
            <p className="text-sm">From: {detailChatBox.name}</p>
          </div>
          <div className="w-full h-[1px] bg-gray-200 text-center"></div>
          <div className="h-80 py-2 overflow-y-scroll scrollbar-thin">
            <ul>
              {messages
                .slice()
                .reverse()
                .map(
                  (
                    message // Sử dụng slice() để tạo một bản sao và đảo ngược
                  ) => (
                    <li key={message.idMess}>
                      {message.isSender ? (
                        <div className="flex flex-col items-end justify-center mt-2 mr-3">
                          <div className="flex flex-row items-center gap-3">
                            <p className="text-sm p-2 bg-[#2f8ce7] rounded-full text-white">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-start justify-center mt-2">
                          <div className="flex flex-row items-center gap-3">
                            <img
                              src={message.avatar}
                              alt="user"
                              className="w-9 h-9 rounded-full object-cover"
                            />
                            <p className="text-sm p-2 bg-gray-200 rounded-full">
                              {message.content}
                            </p>
                          </div>
                          <p className="text-[10px] ml-1 mt-[0.5px]">
                            {formatTime(message.date)}
                          </p>
                        </div>
                      )}
                    </li>
                  )
                )}
            </ul>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center justify-start">
              <div className="p-2 shadow rounded-full text-xs cursor-pointer hover:bg-gray-200">
                REQUEST VISIT
              </div>
              <div className="p-2 shadow rounded-full text-xs cursor-pointer hover:bg-gray-200">
                MAKE OFFER
              </div>
            </div>

            <div className="flex items-center mt-2 space-x-3 p-2 border bg-white border-gray-300 rounded-xl shadow focus-within:ring-1 focus-within:ring-gray-200 focus-within:border-gray-200 transition ease-in-out duration-150">
              <FontAwesomeIcon
                icon={faFaceSmile}
                className="text-gray-400 w-5 h-5"
              />
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border-none focus:outline-none"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                    e.preventDefault();
                  }
                }}
              />
              <FontAwesomeIcon
                icon={faPaperclip}
                className="text-gray-400 cursor-pointer"
              />
              <button
                className="text-white bg-[#2f8ce7] hover:bg-blue-400 p-3 rounded-full transition-colors duration-200 ease-in-out shadow-xl"
                onClick={handleSendMessage}
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
              </button>
            </div>
          </div>
          {/* <button onClick={handleClearLocalStorage}>Xóa Local Storage</button> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
