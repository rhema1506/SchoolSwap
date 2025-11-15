import React from "react";

interface ChatMessageProps {
  sender: string;
  message: string;
  timestamp?: string;
  isOwn?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  message,
  timestamp,
  isOwn = false,
}) => {
  return (
    <div
      className={`flex flex-col ${
        isOwn ? "items-end" : "items-start"
      } mb-3 max-w-full`}
    >
      <div className="flex items-center space-x-2 mb-1">
        {!isOwn && (
          <span className="text-xs font-semibold text-gray-500">{sender}</span>
        )}
        {timestamp && (
          <span className="text-[10px] text-gray-400">
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>

      <div
        className={`px-3 py-2 rounded-2xl text-sm shadow ${
          isOwn
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
