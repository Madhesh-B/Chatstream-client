import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Send, User } from "lucide-react";

import {
  useDeleteSignal,
  useEditSignal,
  useJoinChat,
  useRecieveSignal,
  useSendMessage,
} from "../../../hooks/chatSocket";
import formatTime from "../../../utility/formatTime";

const ChatBlock = ({ chatId, senderId, profileURL }) => {
  const [message, setMessage] = useState("");

  const joinChat = useJoinChat();
  const sendMessage = useSendMessage();
  const editMessage = useEditSignal();
  const deleteMessage = useDeleteSignal();

  useRecieveSignal();
  const { senderName, chats } = useSelector((state) => state.chat);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!chatId || !senderId) return;
    joinChat(chatId, senderId);
  }, [chatId, senderId]);

  const handleSendMessage = () => {
    let messageContent = message.trim();
    if (!messageContent) return;
    sendMessage(messageContent);
    setMessage("");
  };

  useEffect(() => {}, []);

  return (
    <>
      {chatId && senderId ? (
        <div className="w-100 h-100">
          <div className="w-100 py-2 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2 px-3 py-2">
              <div
                className="bg-secondary d-flex justify-content-center align-items-center rounded-circle overflow-hidden"
                style={{ width: "50px", height: "50px" }}
              >
                {profileURL ? (
                  <img src={profileURL} className="w-100 h-100" />
                ) : (
                  <User size={26} className="text-white" />
                )}
              </div>
              <div className="text-secondary h4 mt-2">{senderName}</div>
            </div>
          </div>

          <div className="w-100 h-80vh overflow-auto styled-scrollbar">
            {chats.map((chat, index) => (
              <div
                key={chat.id}
                className={`w-100 d-flex flex-column ${chat.senderId == uid ? "align-items-end" : "align-items-start"} px-4 py-2`}
              >
                <div className="max-w-500px p-3 bg-secondary rounded-2">
                  {chat.content}
                </div>
                <div className="text-light text-uppercase">
                  {formatTime(chat.timestamp)}
                </div>
              </div>
            ))}
          </div>

          <div className="position-relative w-100 d-flex justify-content-center px-3">
            <input
              type="text"
              id="message-input"
              className="w-100 px-2 py-2 rounded-2 outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="Hey, How are you Doing ?"
              autoComplete="off"
              autoFocus
            />
            <div className="end-20px position-absolute top-50 translate-middle-y">
              <button
                className="btn bg-transparent border-0 text-dark"
                onClick={handleSendMessage}
              >
                <Send />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100 py-2">
          <div className="w-100 mt-5 text-center text-secondary">
            Your messages will appear here once you pick a conversation.
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBlock;
