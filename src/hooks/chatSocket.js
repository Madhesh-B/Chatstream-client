import { useDispatch, useSelector } from "react-redux";

import {
  useAddMessage,
  useDeleteMessage,
  useEditMessage,
  useSetPreviousChat,
  useSetSendersInfo,
} from "./chatOperation"
import { initialChatList } from "../features/chatList";
import { useSocketEmit, useSocketOn } from "./socketFunction";
import { useToaster } from "./toast";

import api from "../services/api";


export const useGetChatList = () => {
  const dispatch = useDispatch();
  const toast = useToaster();
  return async () => {
    try {
      const res = await api.get("/api/chats/chat-list");
      dispatch(initialChatList(res.data || []));
    } catch (error) {
      toast(error?.response?.data?.message || "Something Went Wrong!", "danger");
    }
  };
};

export const useJoinChat = () => {
  const emit = useSocketEmit();
  return (chatId, senderId) => emit("join_chat", { chatId, senderId });
}

export const useSendMessage = () => {
  const addMessage = useAddMessage();
  const emit = useSocketEmit();
  return (message) => {
    if (!emit) return;
    const messageInfo = addMessage({ content: message });
    emit("send_message", messageInfo);
  }
}

export const useEditSignal = () => {
  const editMessage = useEditMessage();
  const emit = useSocketEmit();
  return (messageId, content) => {
    if (!emit) return;
    editMessage(messageId, content);
    emit("edit_message", { messageId, content });
  }
}

export const useDeleteSignal = () => {
  const deleteMessage = useDeleteMessage();
  const emit = useSocketEmit();
  const { userName } = useSelector((state) => state.auth);
  return (messageId) => {
    if (!emit) return;
    deleteMessage(messageId, userName);
    emit("delete_message", { messageId, senderName: userName })
  }
}

export const useRecieveSignal = () => {
  const addMessage = useAddMessage();
  const editMessage = useEditMessage();
  const deleteMessage = useDeleteMessage();
  const setPreviousChat = useSetPreviousChat();
  const setSenderInfo = useSetSendersInfo();
  const toast = useToaster();

  useSocketOn("set_sender_info", ({ name, chatId }) => {
    setSenderInfo(name, chatId);
  });

  useSocketOn("prev_chat", ({ chats }) => {
    setPreviousChat(chats);
  });

  useSocketOn("recieve_message", ({ id, content, senderId, timestamp }) => {
    addMessage({ id, senderId, content, timestamp });
  });

  useSocketOn("edit_message", ({ messageId, content }) => {
    editMessage(messageId, content);
  });

  useSocketOn("delete_message", ({ id, senderName }) => {
    deleteMessage(id, senderName);
  });

  useSocketOn("error_message", ({ message }) => {
    toast(message, "danger");
  });
}