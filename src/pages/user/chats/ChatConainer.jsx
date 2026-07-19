import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { SearchIcon, User, X } from "lucide-react";

import ChatstreamLogo from "./../../../assets/images/Chatstream_logo.webp";
import { useGetChatList } from "../../../hooks/chatSocket";
import ChatBlock from "./ChatBlock";

const ChatConainer = () => {
  const [search, setSearch] = useState("");
  const [chatInfo, setChatInfo] = useState({
    chatId: "",
    senderId: "",
    profileURL: "",
  });

  const getChatList = useGetChatList();

  useEffect(() => {
    getChatList();
  }, []);

  const { chatList } = useSelector((state) => state.chatList);

  let contactList = useMemo(() => {
    return chatList.filter((chat) => {
      return chat.senderName.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, chatList]);

  return (
    <div className="w-100 h-100 bg-dark overflow-hidden">
      <div className="d-flex flex-row w-100 h-100">
        <div className="d-flex flex-column w-25 bg-black h-100">
          <div className="d-flex justify-content-center align-items-center gap-2 pe-5 py-2">
            <img
              src={ChatstreamLogo}
              alt="Chatstream Logo"
              draggable={false}
              style={{ width: "100px", height: "100px" }}
            />
            <span className="text-white h1 mt-2">Chatstream</span>
          </div>
          <div className="position-relative w-100 px-3">
            <input
              type="text"
              value={search}
              id="search-input"
              className="w-100 form-control shadow-none ps-4 pe-4"
              placeholder="Search for Chat"
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              autoFocus
            />
            <SearchIcon
              size={18}
              className="position-absolute top-50 translate-middle-y text-dark-emphasis"
              style={{ left: "20px" }}
            />

            <X
              size={18}
              className="position-absolute top-50 translate-middle-y text-dark-emphasis"
              style={{ right: "20px", cursor: "pointer" }}
            />
          </div>
          <div className="flex-grow-1 w-100 h-auto p-2 mt-3">
            {contactList.map((element, index) => (
              <div
                key={element.chatId}
                className="hover:bg-gray d-flex align-items-center gap-3 w-100 p-2 mb-2 rounded-3"
                onClick={() => {
                  setChatInfo((prev) => ({
                    ...prev,
                    senderId: element.senderId,
                    chatId: element.chatId,
                    profileURL: element.profileURL,
                  }));
                }}
              >
                <div
                  className="bg-secondary d-flex justify-content-center align-items-center rounded-circle overflow-hidden"
                  style={{ width: "50px", height: "50px" }}
                >
                  {element.profileURL ? (
                    <img src={element.profileURL} className="w-100 h-100" />
                  ) : (
                    <User size={26} className="text-white" />
                  )}
                </div>
                <div className="text-secondary h4 mt-2 user-select-none">
                  {element.senderName}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-75 bg-dark h-100">
          <ChatBlock
            chatId={chatInfo.chatId}
            senderId={chatInfo.senderId}
            profileURL={chatInfo.profileURL}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatConainer;
