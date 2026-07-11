import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addmessage,
  clearChat,
  deleteMessage,
  editMessage,
  setPreviousChat,
  updateSenderInfo
} from "../features/chatSlice";

export const useSetSendersInfo = () => {
  const dispatch = useDispatch();
  return (name, chatId) => {
    dispatch(updateSenderInfo({ name, chatId }));
  }
};

export const useSetPreviousChat = () => {
  const dispatch = useDispatch();
  return (chats) => {
    dispatch(setPreviousChat(chats));
  }
};

export const useAddMessage = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  return useCallback((content, senderId = uid, timestamp = Date.now()) => {
    const newMessage = { content, senderId, timestamp };
    dispatch(addmessage(newMessage));
    return newMessage;
  }, [uid]);
};

export const useEditMessage = () => {
  const dispatch = useDispatch();
  return (messageId, content) => {
    dispatch(editMessage({ messageId, content }));
  }
};

export const useDeleteMessage = () => {
  const dispatch = useDispatch();
  return (id, senderName) => {
    dispatch(deleteMessage({ id, senderName }));
  }
};

export const useClearChat = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(clearChat());
  }
};