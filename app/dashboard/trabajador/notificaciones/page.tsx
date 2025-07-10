'use client';

import { useState } from "react";
import { FaBell, FaCheck } from "react-icons/fa";

const mockNotificaciones = [
  {
    id: 1,
    usuario: "Lucia_12",
    avatar: "/images/editables/user1.jpg",
    mensaje: "comentó en tu publicación",
    tiempo: "hace 2 horas",
    leido: false,
  },
  {
    id: 2,
    usuario: "BrayanC",
    avatar: "/images/editables/user2.jpg",
    mensaje: "te siguió",
    tiempo: "ayer",
    leido: true,
  },
  {
    id: 3,
    usuario: "J. Valerio",
    avatar: "/images/editables/user3.jpg",
    mensaje: "le dio like a tu foto",
    tiempo: "hace 3 días",
    leido: false,
  },
];

export default function NotificacionesPage() {
  const [notificaciones, setNotificaciones] = useState(mockNotificaciones);
  const [filtro, setFiltro] = useState<"todas" | "no-leidas">("todas");

  const marcarComoLeida = (id: number) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leido: true } : n))
    );
  };

  const marcarTodasComoLeidas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leido: true })));
  };

  const filtradas =
    filtro === "todas"
      ? notificaciones
      : notificaciones.filter((n) => !n.leido);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaBell /> Notificaciones
        </h1>
        <button
          onClick={marcarTodasComoLeidas}
          className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-fit"
        >
          <FaCheck className="inline mr-1" /> Marcar todas como leídas
        </button>
      </div>

      <div className="flex gap-3 mb-4 text-sm">
        <button
          onClick={() => setFiltro("todas")}
          className={`px-3 py-1 rounded-full transition ${
            filtro === "todas"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFiltro("no-leidas")}
          className={`px-3 py-1 rounded-full transition ${
            filtro === "no-leidas"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          No leídas
        </button>
      </div>

      <div className="space-y-4">
        {filtradas.length === 0 ? (
          <p className="text-gray-500 text-center">No hay notificaciones.</p>
        ) : (
          filtradas.map((n) => (
            <div
              key={n.id}
              onClick={() => marcarComoLeida(n.id)}
              className={`flex items-start gap-4 p-4 rounded-lg shadow-sm border cursor-pointer hover:bg-gray-50 transition ${
                n.leido ? "bg-white" : "bg-blue-50 border-blue-300"
              }`}
            >
              <img
                src={n.avatar}
                className="w-10 h-10 rounded-full object-cover"
                alt={n.usuario}
              />
              <div className="flex-1">
                <p className="text-gray-800 text-sm sm:text-base">
                  <span className="font-semibold">{n.usuario}</span> {n.mensaje}
                </p>
                <p className="text-xs text-gray-500 mt-1">{n.tiempo}</p>
              </div>
              {!n.leido && (
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
