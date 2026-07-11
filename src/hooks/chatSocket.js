import { useSelector } from "react-redux";
import { useSocketEmit, useSocketOn } from "./socketFunction";
import { useAddMessage, useDeleteMessage, useEditMessage, useSetPreviousChat, useSetSendersInfo } from "./chatOperation"


export const useJoinChat = () => {
  const emit = useSocketEmit();
  return (chatId, senderId) => emit("join_chat", { chatId, senderId });
}

export const useSendMessage = () => {
  const addMessage = useAddMessage();
  const emit = useSocketEmit();
  return (message) => {
    if (!emit) return;
    const messageInfo = addMessage(message);
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

export const recieveSignal = () => {
  const addMessage = useAddMessage();
  const editMessage = useEditMessage();
  const deleteMessage = useDeleteMessage();
  const setPreviousChat = useSetPreviousChat();
  const setSenderInfo = useSetSendersInfo();

  useSocketOn("set_sender_info", ({ name, chatId }) => {
    setSenderInfo(name, chatId);
  });

  useSocketOn("prev_chat", ({ chats }) => {
    setPreviousChat(chats);
  });

  useSocketOn("recieve_message", ({ content, senderId, timestamp }) => {
    addMessage(content, senderId, timestamp);
  });

  useSocketOn("edit_message", ({ messageId, content }) => {
    editMessage(messageId, content);
  });

  useSocketOn("delete_message", ({ id, senderName }) => {
    deleteMessage(id, senderName);
  });
}