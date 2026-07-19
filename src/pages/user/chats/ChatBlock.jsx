import { forwardRef, useEffect, useRef, useState } from "react";
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

  const messageInputRef = useRef(null);
  const messageContainerRef = useRef(null);
  const contextMenuRef = useRef([]);

  const joinChat = useJoinChat();
  const sendMessage = useSendMessage();
  const editMessage = useEditSignal();
  const deleteMessage = useDeleteSignal();

  const sendByMe = [
    { icon: User, text: "User" },
    { icon: User, text: "User" },
    { icon: User, text: "User" },
  ];
  const sendByUser = [];

  useRecieveSignal();

  const { senderName, chats } = useSelector((state) => state.chat);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!chatId || !senderId) return;
    joinChat(chatId, senderId);
  }, [chatId, senderId]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (!/^[a-zA-Z ]$/.test(e.key)) return;
      messageInputRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current?.scrollHeight ?? 0,
      behavior: "smooth",
    });
  }, [chats]);

  const handleSendMessage = () => {
    let messageContent = message.trim();
    if (!messageContent) return;
    sendMessage(messageContent);
    setMessage("");
  };

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
              <div className="text-secondary h4 mt-2 user-select-none">
                {senderName}
              </div>
            </div>
          </div>

          <div
            ref={messageContainerRef}
            className="w-100 h-80vh overflow-auto styled-scrollbar"
          >
            {chats.map((chat, index) => (
              <div
                key={chat.id}
                className={`position-relative w-100 d-flex flex-column ${chat.senderId == uid ? "align-items-end" : "align-items-start"} px-4 py-2 user-select-none`}
              >
                <div className="max-w-500px p-3 bg-secondary rounded-2">
                  {chat.content}
                </div>
                <div className="text-light text-uppercase">
                  {formatTime(chat.timestamp)}
                </div>
                <ContextMenu
                  ref={(el) => (contextMenuRef[index] = el)}
                  options={chat.senderId == uid ? sendByMe : sendByUser}
                />
              </div>
            ))}
          </div>

          <div className="position-relative w-100 py-3 bg-dark border-top d-flex justify-content-center align-items-center px-3">
            <input
              ref={messageInputRef}
              type="text"
              id="message-input"
              className="w-100 px-2 py-2 rounded-2 bg-dark text-light border-0 outline-none"
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
                className="btn px-3 py-2 bg-black text-light border-0"
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

const ContextMenu = forwardRef(({ options }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-black position-absolute bottom-100 p-1 rounded-1 hover:bg-gray"
    >
      {options.map((option, index) => (
        <div
          key={option.text}
          className="btn d-flex justify-content-start align-items-center gap-2"
        >
          <div className="">
            <option.icon />
          </div>
          <div className="">{option.text}</div>
        </div>
      ))}
    </div>
  );
});

export default ChatBlock;
