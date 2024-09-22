export interface AuthUser {
  id: number;
  username: string;
  avatarUrl: string;
  messages?: Message[];
}

export interface Message {
  idMess: number;
  isSender: boolean;
  name: string;
  content: string;
  avatar: string;
  date: string;
}

export interface ChatBox {
  id: number;
  nameChat: string;
  name: string;
  messages: Message[];
  avatar: string;
  date: string;
  count: number;
  isRead: boolean;
}

// const users: User[] = [
//   {
//     id: "user1",
//     username: "Hali",
//     avatarUrl: "url_to_avatar",
//   },
//   {
//     id: "user2",
//     username: "John",
//     avatarUrl: "url_to_avatar",
//   },
// ];

// const messages: Message[] = [
//   {
//     id: "msg1",
//     text: "Hello sir!",
//     senderId: "user1",
//     timestamp: new Date().toISOString(),
//   },
//   {
//     id: "msg2",
//     text: "Hi Hali, how are you?",
//     senderId: "user2",
//     timestamp: new Date().toISOString(),
//   },
// ];

// const chatRooms: ChatRoom[] = [
//   {
//     id: "room1",
//     name: "Gold Coast",
//     members: ["user1", "user2"],
//     messages: [messages[0], messages[1]],
//   },
// ];
