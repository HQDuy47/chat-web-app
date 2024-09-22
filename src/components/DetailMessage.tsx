import { useState, useContext, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { ChatContext } from "../Context/chatContext";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function DetailMessage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const context = useContext(ChatContext);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [seenMessages, setSeenMessages] = useState<{ [key: number]: boolean }>(
    {}
  );

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (context) {
      scrollToBottom();
    }
  }, [numericId, context]);

  if (!context) {
    return null;
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
      scrollToBottom();
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
    };
    return date.toLocaleTimeString("en-US", options);
  };

  const handleIconClick = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessageContent((prevContent) => prevContent + emoji.native);
    setShowPicker(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setMessageContent((prevContent) => prevContent + " " + file.name);
    }
  };

  const handleQuickMessage = (message: string) => {
    setMessageContent((prevContent) => prevContent + message + " ");
  };

  const handleSeen = (id: number) => {
    if (!seenMessages[id]) {
      setSeenMessages((prevSeenMessages) => ({
        ...prevSeenMessages,
        [id]: true,
      }));
    }

    context.markAsRead(id);
  };

  return (
    <div className="px-4" onClick={() => handleSeen(numericId)}>
      {detailChatBox ? (
        <>
          <div className="py-1">
            <p className="text-lg font-semibold">{detailChatBox.nameChat}</p>
            <span className="text-sm">From: {detailChatBox.name}</span>
          </div>
          <div className="w-full h-[1px] bg-gray-200 text-center"></div>
          <div className="h-80 py-2 overflow-y-scroll scrollbar-thin">
            <ul>
              {messages
                .slice()
                .reverse()
                .map((message) => (
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
                            loading="lazy"
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
                ))}
            </ul>
            <div ref={messagesEndRef} />
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center justify-start">
              <div
                className="p-2 shadow rounded-full text-xs cursor-pointer hover:bg-gray-200"
                onClick={() => handleQuickMessage("REQUEST VISIT")}
              >
                REQUEST VISIT
              </div>
              <div
                className="p-2 shadow rounded-full text-xs cursor-pointer hover:bg-gray-200"
                onClick={() => handleQuickMessage("MAKE OFFER")}
              >
                MAKE OFFER
              </div>
            </div>

            <div className="flex items-center mt-2 space-x-3 p-2 border bg-white border-gray-300 rounded-xl shadow focus-within:ring-1 focus-within:ring-gray-200 focus-within:border-gray-200 transition ease-in-out duration-150">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faFaceSmile}
                  className="text-gray-400 w-5 h-5 cursor-pointer"
                  onClick={handleIconClick}
                />
                {showPicker && (
                  <div className="absolute bottom-full left-0 z-10">
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}
              </div>
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
              <div className="relative">
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    className="text-gray-400 cursor-pointer"
                  />
                </label>
              </div>
              <button
                className="text-white bg-[#2f8ce7] hover:bg-blue-400 p-3 rounded-full transition-colors duration-200 ease-in-out shadow-xl"
                onClick={() => {
                  handleSendMessage();
                }}
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
              </button>
            </div>
          </div>
          {/* <button onClick={handleClearLocalStorage}>Xóa Local Storage</button> */}
        </>
      ) : (
        <div className="flex flex-col w-full justify-center items-center h-60">
          <p className="text-center text-gray-500">
            Haven't selected any items yet
          </p>
        </div>
      )}
    </div>
  );
}
