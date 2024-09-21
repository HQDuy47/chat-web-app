import {
  getAuthUserStart,
  getAuthUserSuccess,
  getAuthUserFailed,
} from "./authUserSlice";
import { AuthUser } from "../interfaces/interface";

const getAuthUser = async (dispatch: any) => {
  dispatch(getAuthUserStart());
  try {
    const mockUserData: AuthUser = {
      id: 1,
      username: "Jimmy Hendrix",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww",
    };

    setTimeout(() => {
      dispatch(getAuthUserSuccess(mockUserData));
    }, 1000);
  } catch (error) {
    dispatch(getAuthUserFailed());
  }
};

// const getAllChatBoxes = async (dispatch: any) => {
//   dispatch(getChatBoxesStart());
//   try {
//     setTimeout(() => {
//       dispatch(getChatBoxesSuccess(mockChatBoxes));
//     }, 1000);
//   } catch (error) {
//     dispatch(getChatBoxesFailed());
//   }
// };

// const getChatBoxById = async (dispatch: any, id: number) => {
//   dispatch(getChatBoxByIdStart());
//   try {
//     const chatBox = mockChatBoxes.find((chatBox) => chatBox.id === id);
//     setTimeout(() => {
//       dispatch(getChatBoxByIdSuccess(chatBox));
//     }, 100);
//   } catch (error) {
//     dispatch(getChatBoxByIdFailed());
//   }
// };

// const addMessage = async (dispatch: any, newMessage: any, chatBoxId: any) => {
//   dispatch(addMessageStart()); // Bắt đầu quá trình thêm tin nhắn
//   try {
//     const chatBoxIndex = mockChatBoxes.findIndex((box) => box.id === chatBoxId);

//     if (chatBoxIndex === -1) {
//       console.error(`Không tìm thấy chat box với id ${chatBoxId}`);
//       dispatch(addMessageFailed()); // Gọi action thất bại nếu không tìm thấy chat box
//       return;
//     }

//     // Tạo tin nhắn mới với ID tự động
//     newMessage.idMess = mockChatBoxes[chatBoxIndex].messages.length + 1;

//     // Cập nhật chat boxes bằng cách thêm tin nhắn mới
//     const updatedChatBoxes = mockChatBoxes.map((box, index) => {
//       if (index === chatBoxIndex) {
//         return {
//           ...box,
//           messages: [...box.messages, newMessage], // Thêm tin nhắn mới
//         };
//       }
//       return box;
//     });

//     // Cập nhật lại mockChatBoxes
//     mockChatBoxes = updatedChatBoxes;

//     console.log(`Tin nhắn đã được thêm vào chat box ${chatBoxId}`);
//     dispatch(addMessageSuccess({ chatBoxId, newMessage })); // Dispatch action thành công
//   } catch (error) {
//     console.error("Lỗi khi thêm tin nhắn:", error);
//     dispatch(addMessageFailed()); // Dispatch action thất bại nếu có lỗi
//   }
// };

// let mockChatBoxes = [
//   {
//     id: 1,
//     nameChat: "A",
//     name: "Ho Quoc Bao",
//     messages: [
//       {
//         idMess: 1,
//         isSender: false,
//         name: "Sarah Johnson",
//         content: "Let's meet tomorrow.",
//         avatar:
//           "https://images.unsplash.com/photo-1706885093476-b1e54f3b7496?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
//         date: "02 Feb",
//         count: 3,
//       },
//       {
//         id: 2,
//         isSender: true,
//         name: "Jimmy Hendrix",
//         content: "I'll send you the files soon.",
//         avatar:
//           "https://plus.unsplash.com/premium_photo-1664541336816-2a2987114ca4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
//         date: "02 Feb",
//         count: 2,
//       },
//       {
//         id: 3,
//         isSender: false,
//         name: "Sarah Johnson",
//         content: "Did you finish the report?",
//         avatar:
//           "https://images.unsplash.com/photo-1706885093476-b1e54f3b7496?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
//         date: "03 Feb",
//         count: 0,
//       },
//     ],
//     avatar:
//       "https://images.unsplash.com/photo-1706885093476-b1e54f3b7496?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
//     date: "02 Feb",
//     count: 3,
//   },
//   {
//     id: 2,
//     nameChat: "B",
//     name: "Michael Scott",
//     messages: [
//       {
//         idMess: 1,
//         isSender: true,
//         name: "Jimmy Hendrix",
//         content: "Let's go over the sales numbers.",
//         avatar:
//           "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww",
//         date: "05 Feb",
//         count: 1,
//       },
//       {
//         idMess: 2,
//         isSender: false,
//         name: "Pam Beesly",
//         content: "Don't forget the office party.",
//         avatar:
//           "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
//         date: "06 Feb",
//         count: 0,
//       },
//       {
//         idMess: 3,
//         isSender: true,
//         name: "Jimmy Hendrix",
//         content: "Can we move the meeting to tomorrow?",
//         avatar:
//           "https://images.unsplash.com/photo-1528763380143-65b3ac52784f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
//         date: "07 Feb",
//         count: 2,
//       },
//     ],
//     avatar:
//       "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
//     date: "05 Feb",
//     count: 1,
//   },
//   {
//     id: 3,
//     nameChat: "B",
//     name: "John Lennon",
//     messages: [
//       {
//         idMess: 1,
//         isSender: true,
//         name: "Jimmy Hendrix",
//         content: "Working on the new song?",
//         avatar:
//           "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fHww",
//         date: "08 Feb",
//         count: 0,
//       },
//       {
//         idMess: 2,
//         isSender: false,
//         name: "George Harrison",
//         content: "Let's practice tomorrow.",
//         avatar:
//           "https://plus.unsplash.com/premium_photo-1664541336816-2a2987114ca4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
//         date: "09 Feb",
//         count: 2,
//       },
//     ],
//     avatar:
//       "https://plus.unsplash.com/premium_photo-1664541336816-2a2987114ca4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
//     date: "08 Feb",
//     count: 0,
//   },
// ];

export { getAuthUser };
