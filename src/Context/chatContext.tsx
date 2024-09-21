import React, { createContext, useState, ReactNode, useEffect } from "react";
import { ChatBox } from "../interfaces/interface";

interface ChatContextType {
  chatBoxes: ChatBox[];
  setChatBoxes: React.Dispatch<React.SetStateAction<ChatBox[]>>;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatBoxes, setChatBoxes] = useState<ChatBox[]>(() => {
    // Lấy dữ liệu từ Local Storage
    const savedChatBoxes = localStorage.getItem("chatBoxes");
    return savedChatBoxes ? JSON.parse(savedChatBoxes) : mockChatBoxes;
  });

  useEffect(() => {
    // Lưu dữ liệu vào Local Storage mỗi khi chatBoxes thay đổi
    localStorage.setItem("chatBoxes", JSON.stringify(chatBoxes));
  }, [chatBoxes]);

  return (
    <ChatContext.Provider value={{ chatBoxes, setChatBoxes }}>
      {children}
    </ChatContext.Provider>
  );
};

let mockChatBoxes: ChatBox[] = [
  {
    id: 1,
    nameChat: "A",
    name: "Ho Quoc Bao",
    messages: [
      {
        idMess: 1,
        isSender: false,
        name: "Sarah Johnson",
        content: "Let's meet tomorrow.",
        avatar:
          "https://images.unsplash.com/photo-1706885093476-b1e54f3b7496?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
        date: "2024-09-20T08:45:30.000Z",
        count: 3,
      },
      {
        idMess: 2,
        isSender: true,
        name: "Jimmy Hendrix",
        content: "I'll send you the files soon.",
        avatar:
          "https://plus.unsplash.com/premium_photo-1664541336816-2a2987114ca4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
        date: "2024-09-22T14:15:10.500Z",
        count: 2,
      },
      {
        idMess: 3,
        isSender: false,
        name: "Sarah Johnson",
        content: "Did you finish the report?",
        avatar:
          "https://images.unsplash.com/photo-1706885093476-b1e54f3b7496?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
        date: "2024-09-23T09:00:00.000Z",
        count: 0,
      },
    ],
    avatar:
      "https://images.unsplash.com/photo-1706885093476-b1e54f3b7496?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "2024-09-30T16:45:05.000Z",
    count: 3,
  },
  {
    id: 2,
    nameChat: "B",
    name: "Michael Scott",
    messages: [
      {
        idMess: 1,
        isSender: true,
        name: "Jimmy Hendrix",
        content: "Let's go over the sales numbers.",
        avatar:
          "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww",
        date: "2024-09-24T18:30:45.250Z",
        count: 1,
      },
      {
        idMess: 2,
        isSender: false,
        name: "Pam Beesly",
        content: "Don't forget the office party.",
        avatar:
          "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
        date: "2024-09-25T07:20:15.750Z",
        count: 0,
      },
      {
        idMess: 3,
        isSender: true,
        name: "Jimmy Hendrix",
        content: "Can we move the meeting to tomorrow?",
        avatar:
          "https://images.unsplash.com/photo-1528763380143-65b3ac52784f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
        date: "2024-09-26T11:50:00.000Z",
        count: 2,
      },
    ],
    avatar:
      "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "2024-09-27T13:05:25.500Z",
    count: 1,
  },
  {
    id: 3,
    nameChat: "B",
    name: "John Lennon",
    messages: [
      {
        idMess: 1,
        isSender: true,
        name: "Jimmy Hendrix",
        content: "Working on the new song?",
        avatar:
          "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fHww",
        date: "2024-09-28T15:30:40.750Z",
        count: 0,
      },
      {
        idMess: 2,
        isSender: false,
        name: "George Harrison",
        content: "Let's practice tomorrow.",
        avatar:
          "https://plus.unsplash.com/premium_photo-1664541336816-2a2987114ca4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
        date: "2024-09-29T10:15:15.250Z",
        count: 2,
      },
    ],
    avatar:
      "https://plus.unsplash.com/premium_photo-1664541336816-2a2987114ca4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "2024-09-30T16:45:05.000Z",
    count: 0,
  },
];
