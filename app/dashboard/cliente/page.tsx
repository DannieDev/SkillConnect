'use client';

import Link from 'next/link';

export default function ClienteDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">¡Bienvenido de nuevo, Miguel! 👋</h1>
      <p className="text-gray-600 mb-6">
        Aquí puedes ver un resumen de tu actividad como cliente.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500">Servicios contratados</p>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500">Satisfacción</p>
          <p className="text-3xl font-bold text-green-500">100%</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500">Reseñas escritas</p>
          <p className="text-3xl font-bold text-yellow-500">30</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tus últimos servicios</h2>
        <Link href="/dashboard/cliente/perfil" className="text-blue-600 hover:underline">
          Ver perfil
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-xl p-4">
          <img
            src="/images/limpieza.jpg"
            alt="Limpieza"
            className="w-full h-48 object-cover rounded-lg mb-1"
          />
          <p className="text-lg font-semibold">Limpieza de sala</p>
          <p className="text-sm text-gray-500">Fecha: 2024-07-01</p>
          <p className="text-green-600 font-medium mt-1">✅ Completado</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <img
            src="/images/instalacion2.jpg"
            alt="Instalación"
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
          <p className="text-lg font-semibold">Instalación de mini split</p>
          <p className="text-sm text-gray-500">Fecha: 2024-06-28</p>
          <p className="text-yellow-500 font-medium mt-1">🕐 En proceso</p>
        </div>

        {/* Puedes agregar más servicios */}
      </div>
    </div>
  );
}
