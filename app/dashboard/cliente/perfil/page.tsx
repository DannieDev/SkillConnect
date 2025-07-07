'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaSignOutAlt,
  FaCheckCircle, FaClock
} from 'react-icons/fa';

export default function PerfilCliente() {
  const router = useRouter();

  const [cliente] = useState({
    nombre: 'Miguel Torres',
    username: '@miguel_t',
    email: 'miguel@example.com',
    telefono: '5512345678',
    direccion: 'CDMX, México',
    foto: '/images/user.jpg',
    serviciosContratados: 12,
    activoDesde: '2023-11-10',
  });

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
      <aside className="w-72 bg-white border-r px-6 py-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-center mb-6">
            <img src="/images/logo.png" alt="SkillConnect" className="h-10" />
          </div>

          <div className="flex flex-col items-center text-center mb-6">
            <img
              src={cliente.foto}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover mb-3 border"
            />
            <h2 className="text-lg font-bold">{cliente.nombre}</h2>
            <p className="text-sm text-gray-500">{cliente.username}</p>
          </div>

          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              {cliente.email}
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-500" />
              {cliente.telefono}
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              {cliente.direccion}
            </li>
            <li className="flex items-center gap-2">
              <FaCalendarAlt className="text-purple-500" />
              Desde: {cliente.activoDesde}
            </li>
          </ul>
        </div>

        <button className="flex items-center gap-2 text-red-600 hover:underline text-sm mt-10">
          <FaSignOutAlt />
          Cerrar sesión
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">👋 ¡Hola, {cliente.nombre.split(' ')[0]}!</h1>

        {/* Resumen */}
        <section className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-xl">
          <h2 className="text-xl font-semibold mb-4">Resumen de cuenta</h2>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{cliente.serviciosContratados}</div>
              <p className="text-gray-500">Servicios contratados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">100%</div>
              <p className="text-gray-500">Satisfacción</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/dashboard/cliente/perfil/editar')}
            className="mt-6 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Editar información
          </button>
        </section>

        {/* Servicios recientes */}
        <section>
          <h2 className="text-xl font-semibold mb-4">🕓 Últimos servicios contratados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviciosRecientes.map((s, i) => (
              <div key={i} className="bg-white shadow rounded-xl p-4 flex gap-4 items-center">
                <img src={s.imagen} alt={s.titulo} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h3 className="text-lg font-bold">{s.titulo}</h3>
                  <p className="text-sm text-gray-500">Fecha: {s.fecha}</p>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    {s.estado === 'Completado' ? (
                      <FaCheckCircle className="text-green-600" />
                    ) : (
                      <FaClock className="text-yellow-500" />
                    )}
                    <span className={s.estado === 'Completado' ? 'text-green-600' : 'text-yellow-600'}>
                      {s.estado}
                    </span>
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
