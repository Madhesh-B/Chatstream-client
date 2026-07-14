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
    <>
      {chatId && senderId ? (
        <div className="w-100 h-100">
          <div className=""></div>
        </div>
      ) : (
        <div className="w-100 py-2">
          <div className="w-100 text-center text-secondary">
            Your messages will appear here once you pick a conversation.
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBlock;
