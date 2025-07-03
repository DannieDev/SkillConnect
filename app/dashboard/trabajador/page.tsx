"use client";
import React from "react";
import Link from 'next/link';

const TrabajadorHome = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <section className="mb-10">
          <h1 className="text-2xl font-bold text-gray-800">¡Bienvenido de nuevo, Vanessa! 👋</h1>
          <p className="text-gray-600 mt-2">Aquí puedes ver un resumen de tu actividad como trabajadora.</p>
        </section>

        {/* Tarjetas de resumen */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-sm text-gray-500">Publicaciones</p>
            <p className="text-2xl font-semibold mt-1">52</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-sm text-gray-500">Calificación promedio</p>
            <p className="text-2xl font-semibold mt-1">4.8 ⭐</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-sm text-gray-500">Reseñas recibidas</p>
            <p className="text-2xl font-semibold mt-1">30</p>
          </div>
        </section>

        {/* Últimas publicaciones */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Tus últimas publicaciones</h2>
            <Link href="/dashboard/trabajador/perfil" className="text-blue-600 hover:underline text-sm">
              Ver perfil
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
              <div key={id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={`/images/p${id}.jpg`}
                  alt={`Publicación ${id}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-sm text-gray-600 flex justify-between">
                  <span>♡ 218</span>
                  <span>💬 18</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default TrabajadorHome;
