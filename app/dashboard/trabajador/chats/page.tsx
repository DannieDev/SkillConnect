'use client';

import { useState } from "react";
import {
  FaPaperPlane,
  FaSearch,
  FaSmile,
  FaMicrophone,
  FaRegHeart,
  FaImage,
  FaInfoCircle,
  FaVideo,
  FaPhone
} from "react-icons/fa";

const mockChats = [
  {
    id: "1",
    nombre: "Lucia_12",
    avatar: "/images/editables/user1.jpg",
    lastMessage: "¿A qué hora llegas?",
    timestamp: "10:45 AM",
    messages: [
      { from: "them", text: "¿A qué hora llegas?", date: "2025-07-01T10:45:00" },
      { from: "me", text: "Estoy en camino ya :)", date: "2025-07-01T10:46:00" },
      { from: "me", text: "Hola", date: "2025-07-08T04:39:00" }
    ],
  },
];

function formatFecha(fechaISO: string) {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-MX", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MensajesPage() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [input, setInput] = useState("");

  const enviarMensaje = () => {
    if (!input.trim()) return;
    const nuevoMensaje = {
      from: "me",
      text: input,
      date: new Date().toISOString(),
    };
    setSelectedChat((prev) => ({
      ...prev,
      messages: [...prev.messages, nuevoMensaje],
    }));
    setInput("");
  };

  let lastDate = "";

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      {/* Lista de chats */}
      <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Mensajes</h2>
        <div className="relative mb-4">
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {mockChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition ${
              selectedChat.id === chat.id ? "bg-gray-100" : ""
            }`}
          >
            <img src={chat.avatar} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-800">{chat.nombre}</span>
                <span className="text-gray-400 text-xs">{chat.timestamp}</span>
              </div>
              <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </aside>

      {/* Chat activo */}
      <section className="flex-1 flex flex-col h-full">
        {/* Encabezado */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src={selectedChat.avatar}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-800">{selectedChat.nombre}</p>
              <p className="text-xs text-gray-500">Activo ahora</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-gray-500">
            <FaPhone className="cursor-pointer hover:text-gray-700" />
            <FaVideo className="cursor-pointer hover:text-gray-700" />
            <FaInfoCircle className="cursor-pointer hover:text-gray-700" />
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 px-4 sm:px-6 py-4 overflow-y-auto bg-gray-50 space-y-4 text-sm">
          {selectedChat.messages.map((msg, idx) => {
            const fechaMsg = new Date(msg.date).toDateString();
            const showFecha = fechaMsg !== lastDate;
            lastDate = fechaMsg;

            return (
              <div key={idx} className="flex flex-col items-center">
                {showFecha && (
                  <div className="text-xs text-gray-500 my-2">
                    {formatFecha(msg.date)}
                  </div>
                )}
                <div
                  className={`max-w-[80%] sm:max-w-xs px-4 py-2 rounded-xl shadow text-sm ${
                    msg.from === "me"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-200 text-gray-800 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 px-4 sm:px-6 py-3 flex items-center gap-3">
          <FaSmile className="text-xl text-gray-500 cursor-pointer" />
          <FaImage className="text-xl text-gray-500 cursor-pointer" />
          <FaMicrophone className="text-xl text-gray-500 cursor-pointer" />
          <FaRegHeart className="text-xl text-gray-500 cursor-pointer" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
            type="text"
            placeholder="Enviar mensaje..."
            className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={enviarMensaje}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            <FaPaperPlane />
          </button>
        </div>
      </section>
    </div>
  );
}
