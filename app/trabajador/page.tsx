'use client';

import Image from 'next/image';

export default function TrabajadorHome() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Imagen destacada con overlay */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/images/trabajador-hero.png"
          alt="Bienvenido trabajador"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
            Bienvenido al panel del trabajador
          </h2>
        </div>
      </div>

      {/* Tarjetas de acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Mis Servicios</h3>
          <p className="text-gray-600">Consulta y gestiona los servicios que has aceptado o completado.</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Editar Perfil</h3>
          <p className="text-gray-600">Actualiza tu perfil profesional, habilidades y disponibilidad.</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Disponibilidad</h3>
          <p className="text-gray-600">Publica tus horarios disponibles para ser contactado por clientes.</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Mensajes</h3>
          <p className="text-gray-600">Revisa y responde mensajes de clientes interesados en tus servicios.</p>
        </div>
      </div>

      {/* Botón destacado */}
      <div className="mt-10 text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition">
          Ver oportunidades de trabajo
        </button>
      </div>
    </div>
  );
}
