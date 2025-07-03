'use client';

import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaClock, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';

export default function TrabajadorActivosPage() {
  const router = useRouter();

  const serviciosActivos = [
    {
      cliente: 'Ana Torres',
      servicio: 'Instalación eléctrica',
      fecha: '30/06/2025',
      estado: 'En progreso',
    },
    {
      cliente: 'Luis García',
      servicio: 'Revisión de cortocircuito',
      fecha: '29/06/2025',
      estado: 'Pendiente',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-blue-900">Contrataciones activas</h1>
          <button
            onClick={() => router.back()}
            className="flex items-center text-sm text-blue-600 hover:underline"
          >
            <FaArrowLeft className="mr-1" /> Volver
          </button>
        </div>

        {serviciosActivos.length === 0 ? (
          <p className="text-gray-500 text-sm">No tienes contrataciones activas por el momento.</p>
        ) : (
          <ul className="space-y-4">
            {serviciosActivos.map((item, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">{item.cliente}</p>
                  <p className="text-sm text-gray-600">{item.servicio}</p>
                  <p className="text-xs text-gray-400">Fecha: {item.fecha}</p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center text-sm font-medium">
                  {item.estado === 'En progreso' ? (
                    <FaCheckCircle className="text-green-500 mr-1" />
                  ) : item.estado === 'Pendiente' ? (
                    <FaClock className="text-yellow-500 mr-1" />
                  ) : (
                    <FaTimesCircle className="text-red-500 mr-1" />
                  )}
                  {item.estado}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
