import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  useDeleteSignal,
  useEditSignal,
  useJoinChat,
  useRecieveSignal,
  useSendMessage,
} from "../../../hooks/chatSocket";

const ChatBlock = ({ chatId, senderId }) => {
  const joinChat = useJoinChat();
  const sendMessage = useSendMessage();
  const editMessage = useEditSignal();
  const deleteMessage = useDeleteSignal();

  useRecieveSignal();

  useEffect(() => {
    if (!chatId || !senderId) return;
    joinChat(chatId, senderId);
  }, [chatId, senderId]);

  return (
    <div className="w-100 h-100">
      <div className=""></div>
    </div>
  );
};

export default ChatBlock;
