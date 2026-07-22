import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { Copy, Edit, Send, Trash2, User } from "lucide-react";

import {
  useDeleteSignal,
  useEditSignal,
  useJoinChat,
  useRecieveSignal,
  useSendMessage,
} from "../../../hooks/chatSocket";
import formatTime from "../../../utility/formatTime";

const ChatBlock = React.memo(({ chatId, senderId, profileURL }) => {
  const [message, setMessage] = useState("");
  const [contextMenuIndex, setContextMenuIndex] = useState(-1);

  const messageInputRef = useRef(null);
  const messageContainerRef = useRef(null);
  const contextMenuRef = useRef([]);
  const openedMenuRef = useRef(null);

  const joinChat = useJoinChat();
  const sendMessage = useSendMessage();
  const editMessage = useEditSignal();
  const deleteMessage = useDeleteSignal();

  const { senderName, chats } = useSelector((state) => state.chat);
  const { uid } = useSelector((state) => state.auth);

  const sendByMe = [
    {
      icon: Copy,
      text: "Copy To Clipboard",
      onClick: async ({ content }) => {
        try {
          await navigator.clipboard.writeText(content);
        } catch (error) {
          console.warn("Browser not Supported Copy Option!");
        } finally {
          closeContextMenu();
        }
      },
    },
    {
      icon: Edit,
      text: "Edit",
      onClick: (data) => {
        console.log(data);
      },
    },
    {
      icon: Trash2,
      text: "Unsend",
      onClick: ({ id }, index) => {
        deleteMessage(id, index);
        closeContextMenu();
      },
    },
  ];

  const sendByUser = [
    {
      icon: Copy,
      text: "Copy To Clipboard",
      onClick: async ({ content }) => {
        try {
          await navigator.clipboard.writeText(content);
        } catch (error) {
          console.warn("Browser not Supported Copy Option!");
        } finally {
          closeContextMenu();
        }
      },
    },
  ];

  useRecieveSignal();

  useEffect(() => {
    if (!chatId || !senderId) return;
    joinChat(chatId, senderId);
  }, [chatId, senderId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!/^[a-zA-Z ]$/.test(e.key)) return;
      messageInputRef.current?.focus();
    };

    const handleClickOutSide = (e) => {
      const menu = contextMenuRef.current[contextMenuIndex];
      console.log(!menu?.contains(e.target));

      if (!menu?.contains(e.target)) return;
      openedMenuRef.current?.classList.remove("d-flex");
      openedMenuRef.current?.classList.add("d-none");
      openedMenuRef.current = null;
      setContextMenuIndex(-1);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutSide);

    () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current?.scrollHeight ?? 0,
      behavior: "smooth",
    });
  }, [chats]);

  useEffect(() => {
    const menu = contextMenuRef.current[contextMenuIndex];
    if (openedMenuRef.current && openedMenuRef.current !== menu) {
      openedMenuRef.current?.classList.remove("d-flex");
      openedMenuRef.current?.classList.add("d-none");
    }
    menu?.classList.remove("d-none");
    menu?.classList.add("d-flex");
    openedMenuRef.current = menu;
  }, [contextMenuIndex]);

  const handleContextMenu = useCallback(
    (e, index) => {
      e.preventDefault();
      setContextMenuIndex(index);
    },
    [contextMenuIndex],
  );

  const closeContextMenu = () => {
    openedMenuRef.current?.classList.remove("d-flex");
    openedMenuRef.current?.classList.add("d-none");
    openedMenuRef.current = null;
    setContextMenuIndex(-1);
  };

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
                {chat.isDeleted ? (
                  <>
                    <div className="max-w-500px p-3 bg-secondary rounded-2">
                      {chat.content}
                    </div>
                    <div className="text-light text-uppercase">
                      {formatTime(chat.timestamp)}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="max-w-500px p-3 bg-secondary rounded-2"
                      onContextMenu={(e) => handleContextMenu(e, index)}
                    >
                      {chat.content}
                    </div>
                    <div className="text-light text-uppercase">
                      {formatTime(chat.timestamp)}
                    </div>
                    <ContextMenu
                      ref={(el) => (contextMenuRef.current[index] = el)}
                      options={chat.senderId == uid ? sendByMe : sendByUser}
                      data={chat}
                      index={index}
                    />
                  </>
                )}
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
});

const ContextMenu = forwardRef(({ options, data, index }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-black w-25 text-white position-absolute bottom-100 d-none flex-column gap-2 p-1 rounded-2 hover:bg-gray"
    >
      {options.map((option, index) => (
        <div
          key={option.text}
          className="btn w-100 text-white d-flex justify-content-start align-items-center gap-2"
          onClick={() => option.onClick(data, index)}
        >
          <div className="px-2 py-1">
            <option.icon />
          </div>
          <div className="">{option.text}</div>
        </div>
      ))}
    </div>
  );
});

export default ChatBlock;
