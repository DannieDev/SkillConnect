'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  FaSignOutAlt, FaHome, FaGlobe, FaCog, FaCommentDots, FaBell,
  FaCheckCircle, FaClock
} from 'react-icons/fa';

export default function PerfilCliente() {
  const router = useRouter();

  const [cliente, setCliente] = useState<{
    nombre: string;
    email: string;
    foto: string;
    serviciosContratados: number;
  }>({
    nombre: 'Cargando...',
    email: '',
    foto: '/images/user.jpg',
    serviciosContratados: 0
  });

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await axios.get('/api/auth/userinfo');
        const usuario = res.data.usuario;
        setCliente((prev) => ({
          ...prev,
          nombre: usuario.nombre,
          email: usuario.email,
          serviciosContratados: 12 // puedes hacerlo dinámico luego si gustas
        }));
      } catch (err) {
        console.error('Error al obtener datos del cliente', err);
      }
    };
    obtenerDatos();
  }, []);

  const serviciosRecientes = [
    {
      titulo: 'Limpieza de sala',
      fecha: '2024-07-01',
      estado: 'Completado',
      imagen: '/images/limpieza.jpg',
    },
    {
      titulo: 'Instalación de mini split',
      fecha: '2024-06-28',
      estado: 'En proceso',
      imagen: '/images/split2.webp',
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r flex items-center justify-center">
        <div className="flex flex-col items-start justify-center min-h-screen px-6">
          {/* Logo */}
          <div className="w-full flex justify-center mb-6">
            <img src="/images/logo.png" alt="SkillConnect" className="h-10" />
          </div>

          {/* Usuario */}
          <div className="flex flex-col items-center text-center mb-8 w-full">
            <img
              src={cliente.foto}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover border mb-3"
            />
            <h2 className="text-lg font-bold">{cliente.nombre}</h2>
            <p className="text-sm text-gray-500">{cliente.email}</p>
          </div>

          {/* Menú */}
          <nav className="flex flex-col gap-4 text-sm text-gray-700 w-full mb-10">
            <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
              <FaHome className="text-gray-700" />
              <span>Inicio</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
              <FaGlobe className="text-gray-700" />
              <span>Explora</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
              <FaCog className="text-gray-700" />
              <span>Ajustes</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
              <FaCommentDots className="text-gray-700" />
              <span>Mensajes</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
              <FaBell className="text-gray-700" />
              <span>Notificaciones</span>
            </div>
          </nav>

          {/* Botón salir */}
          <div className="w-full flex justify-center">
            <button className="flex items-center gap-2 text-red-600 hover:underline text-sm">
              <FaSignOutAlt />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">
          👋 ¡Hola, {cliente.nombre !== 'Cargando...' ? cliente.nombre.split(' ')[0] : 'cliente'}!
        </h1>

        {/* Resumen */}
        <section className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Resumen de cuenta</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 mb-2">Servicios contratados</p>
              <div className="text-3xl font-bold text-blue-600">{cliente.serviciosContratados}</div>
            </div>
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 mb-2">Satisfacción</p>
              <div className="text-3xl font-bold text-green-600">100%</div>
            </div>
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 mb-2">Reseñas escritas</p>
              <div className="text-3xl font-bold text-yellow-500">30</div>
            </div>
          </div>
        </section>

        {/* Últimos servicios */}
        <section>
          <h2 className="text-xl font-semibold mb-4">🕓 Últimos servicios contratados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviciosRecientes.map((s, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
                <img src={s.imagen} alt={s.titulo} className="w-20 h-20 rounded-lg object-cover" />
                <div>
                  <h3 className="font-semibold text-lg">{s.titulo}</h3>
                  <p className="text-sm text-gray-500">Fecha: {s.fecha}</p>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    {s.estado === 'Completado' ? (
                      <>
                        <FaCheckCircle className="text-green-600" />
                        <span className="text-green-600">{s.estado}</span>
                      </>
                    ) : (
                      <>
                        <FaClock className="text-yellow-500" />
                        <span className="text-yellow-600">{s.estado}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
