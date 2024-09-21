import { createSlice } from "@reduxjs/toolkit";

interface Message {
  idMess: number;
  isSender: boolean;
  name: string;
  content: string;
  avatar: string;
  date: string;
  count: number;
}

interface ChatBox {
  id: number;
  nameChat: string;
  name: string;
  messages: Message[];
  avatar: string;
  date: string;
  count: number;
}

interface ChatBoxState {
  chatBoxes: ChatBox[] | null; // Có thể là null hoặc một mảng ChatBox
  selectedChatBox: ChatBox | null;
  isFetching: boolean;
  error: boolean;
}

// Cập nhật initialState
const initialState: ChatBoxState = {
  chatBoxes: null,
  selectedChatBox: null,
  isFetching: false,
  error: false,
};

const chatBoxSlice = createSlice({
  name: "chatBox",
  initialState,

  reducers: {
    getChatBoxesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getChatBoxesSuccess: (state, action) => {
      state.chatBoxes = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    getChatBoxesFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getChatBoxByIdStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getChatBoxByIdSuccess: (state, action) => {
      state.selectedChatBox = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    getChatBoxByIdFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addMessageStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addMessageSuccess: (state, action) => {
      const { chatBoxId, newMessage } = action.payload;
      const chatBoxIndex =
        state.chatBoxes?.findIndex((box) => box.id === chatBoxId) ?? -1;

      if (chatBoxIndex !== -1 && state.chatBoxes) {
        // Nếu chatBoxes không phải null, thêm tin nhắn mới
        state.chatBoxes[chatBoxIndex].messages.push(newMessage);
      }

      state.isFetching = false;
      state.error = false;
    },
    addMessageFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

// Xuất các action và reducer
export const {
  getChatBoxesStart,
  getChatBoxesSuccess,
  getChatBoxesFailed,
  getChatBoxByIdStart,
  getChatBoxByIdSuccess,
  getChatBoxByIdFailed,
  addMessageStart,
  addMessageSuccess,
  addMessageFailed,
} = chatBoxSlice.actions;

export default chatBoxSlice.reducer;
