'use client';
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaCommentAlt } from 'react-icons/fa'; import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import {
  FaHome,
  FaGlobe,
  FaCog,
  FaEnvelope,
  FaBell,
  FaSignOutAlt
} from 'react-icons/fa';

const publicaciones = [
  { id: 1, src: '/images/p1.jpg', likes: 218, comments: 18 },
  { id: 2, src: '/images/p2.jpg', likes: 218, comments: 18 },
  { id: 3, src: '/images/p3.jpg', likes: 218, comments: 18 },
  { id: 4, src: '/images/p4.jpg', likes: 218, comments: 18 },
  { id: 5, src: '/images/p5.jpg', likes: 218, comments: 18 },
  { id: 6, src: '/images/p6.jpg', likes: 218, comments: 18 },
];

const PerfilTrabajador: React.FC = () => {
  const [likes, setLikes] = useState(() =>
    publicaciones.map((pub) => ({
      id: pub.id,
      liked: false,
      total: pub.likes,
    }))
  );

  return (
    <div className="flex bg-white min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8 flex flex-col items-center">
        <img src="/images/logo_corto.png" alt="SkillConnect" className="h-10 mb-8" />
        

        <img src="/images/foto_perfil.png" alt="Perfil" className="w-30 h-30 rounded-full border-4 border-white shadow-md mb-2 object-cover" />
        <h2 className="text-md font-semibold">Vanessa Ruíz</h2>
        <p className="text-gray-500 text-sm mb-4">@Vane_R</p>

        <div className="flex gap-4 text-center mb-8">
          <div>
            <p className="font-bold text-sm">52</p>
            <span className="text-xs text-gray-600">Publicaciones</span>
          </div>
          <div>
            <p className="font-bold text-sm">4.8</p>
            <span className="text-xs text-gray-600">Calificación</span>
          </div>
          <div>
            <p className="font-bold text-sm">30</p>
            <span className="text-xs text-gray-600">Reseñas</span>
          </div>
        </div>

        <nav className="flex flex-col gap-7 text-base text-gray-800 w-full px-6">
          <a href="/dashboard/trabajador" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaHome className="text-xl" /> Inicio</a>
          <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaGlobe className="text-xl" /> Explora</a>
          <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaCog className="text-xl" /> Ajustes</a>
          <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaEnvelope className="text-xl" /> Mensajes</a>
          <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaBell className="text-xl" /> Notificaciones</a>
          <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaSignOutAlt className="text-xl" /> Salir</a>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 px-10 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/2">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full px-5 py-2 border rounded-full shadow-sm text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <i className="fas fa-bell text-gray-500 text-lg"></i>
            <i className="fas fa-paper-plane text-gray-500 text-lg"></i>
            <button className="bg-gradient-to-r from-purple-400 to-blue-400 text-white px-4 py-2 rounded-full text-sm">
              + Nueva publicación
            </button>

          </div>
        </div>

        {/* Publicaciones */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Fotos</h3>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">

          {publicaciones.map((pub) => {
            const likeState = likes.find((l) => l.id === pub.id);

            const toggleLike = () => {
              setLikes((prev) =>
                prev.map((l) =>
                  l.id === pub.id
                    ? {
                      ...l,
                      liked: !l.liked,
                      total: l.liked ? l.total - 1 : l.total + 1,
                    }
                    : l
                )
              );
            };

            return (
              <div key={pub.id} className="break-inside-avoid rounded-lg overflow-hidden shadow-sm bg-white mb-4">
                <img src={pub.src} alt="Publicación" className="w-full object-cover rounded-t-md" />

                <div className="flex justify-between items-center text-sm text-gray-600 px-3 py-2">
                  <button
                    onClick={toggleLike}
                    className={`flex items-center gap-1 text-sm transition-transform hover:scale-105 ${likeState?.liked ? 'text-red-500' : 'text-gray-500'
                      }`}
                    title="Guardar en favoritos"
                  >
                    {likeState?.liked ? <FaHeart className="text-base" /> : <FaRegHeart className="text-base" />}
                    <span>{likeState?.total}</span>
                  </button>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <HiOutlineChatBubbleOvalLeft className="text-base w-5 h-5" />
                    {pub.comments}
                  </span>
                </div>
              </div>
            );

          })}
        </div>
      </main>
    </div>
  );
};

export default PerfilTrabajador;
