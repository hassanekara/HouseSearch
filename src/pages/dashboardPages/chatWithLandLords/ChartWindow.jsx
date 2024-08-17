// /* eslint-disable react/prop-types */
// import  { useState, useEffect } from "react";

// const ChatWindow = ({ chatUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");

//   useEffect(() => {
//     const storedMessages = JSON.parse(localStorage.getItem(chatUser)) || [];
//     setMessages(storedMessages);
//   }, [chatUser]);

//   const handleSendMessage = () => {
//     if (inputMessage.trim() === "") return;

//     const newMessage = {
//       user: "Admin",
//       text: inputMessage,
//       timestamp: new Date().toLocaleString(),
//     };

//     const updatedMessages = [...messages, newMessage];
//     setMessages(updatedMessages);
//     setInputMessage("");
//     localStorage.setItem(chatUser, JSON.stringify(updatedMessages));
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
//         <h2 className="text-2xl font-bold">Chat with {chatUser}</h2>
//         <div className="mt-4 space-y-2">
//           {messages.map((message, index) => (
//             <div key={index} className={`p-2 ${message.user === "Admin" ? "bg-blue-200" : "bg-green-200"} rounded`}>
//               <p className="font-bold">{message.user}</p>
//               <p>{message.text}</p>
//               <p className="text-xs text-gray-500">{message.timestamp}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="p-4 bg-gray-300">
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           className="w-full px-4 py-2 border rounded"
//         />
//         <button onClick={handleSendMessage} className="px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;

import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatWindow = () => {
  const { chatUser } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(chatUser)) || [];
    setMessages(storedMessages);
  }, [chatUser]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      user: "Admin",
      text: inputMessage,
      timestamp: new Date().toLocaleString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    localStorage.setItem(chatUser, JSON.stringify(updatedMessages));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        <h2 className="text-2xl font-bold">Chat with {chatUser}</h2>
        <div className="mt-4 space-y-2">
          {messages.map((message, index) => (
            <div key={index} className={`p-2 ${message.user === "Admin" ? "bg-blue-200" : "bg-green-200"} rounded`}>
              <p className="font-bold">{message.user}</p>
              <p>{message.text}</p>
              <p className="text-xs text-gray-500">{message.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-gray-300">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button onClick={handleSendMessage} className="px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
