'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function TrabajadorServiciosPage() {
  const router = useRouter();

  const [servicios, setServicios] = useState([
    {
      id: 1,
      nombre: 'Instalación de lámparas',
      descripcion: 'Colocación segura de lámparas de techo, LED y exteriores.',
      precio: '$300 MXN',
    },
    {
      id: 2,
      nombre: 'Mantenimiento eléctrico',
      descripcion: 'Revisión general de cableado y componentes eléctricos.',
      precio: '$500 MXN',
    },
  ]);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-blue-900">Mis servicios ofrecidos</h1>
          <button
            onClick={() => router.back()}
            className="text-blue-600 text-sm hover:underline flex items-center"
          >
            <FaArrowLeft className="mr-1" /> Volver
          </button>
        </div>

        {/* Botón para agregar servicio */}
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6">
          <FaPlus />
          Agregar nuevo servicio
        </button>

        {/* Lista de servicios */}
        <ul className="space-y-4">
          {servicios.map((servicio) => (
            <li
              key={servicio.id}
              className="p-4 bg-gray-50 border rounded-lg flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="text-md font-bold text-gray-800">{servicio.nombre}</h3>
                <p className="text-sm text-gray-600">{servicio.descripcion}</p>
                <p className="text-sm text-blue-800 font-semibold mt-1">{servicio.precio}</p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="flex items-center gap-1 text-sm text-yellow-600 hover:underline">
                  <FaEdit /> Editar
                </button>
                <button className="flex items-center gap-1 text-sm text-red-600 hover:underline">
                  <FaTrash /> Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
