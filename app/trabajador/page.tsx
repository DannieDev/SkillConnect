'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  FaStar, FaSignOutAlt, FaEdit, FaHistory,
  FaTasks, FaBriefcase, FaCheckCircle
} from 'react-icons/fa';

export default function DashboardTrabajador() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/images/user.jpg"
              alt="Foto trabajador"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">Brayan Omar</h2>
              <p className="text-sm text-gray-600">Electricista Certificado</p>
              <div className="flex items-center text-yellow-500 text-sm">
                <FaStar />
                <span className="ml-1">4.9 (45 reseñas)</span>
              </div>
            </div>
          </div>
          <button
            className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => router.push('/trabajador/editar')}
          >
            <FaEdit className="inline mr-2" />
            Editar perfil
          </button>
        </div>

        {/* Grid de información */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Contrataciones activas */}
          <div className="bg-blue-50 border p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center text-blue-600">
              <FaCheckCircle className="mr-2" /> Contrataciones activas
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>🔧 Juan Pérez - Instalación de focos</li>
              <li>💡 María López - Cotización eléctrica</li>
            </ul>
          </div>

          {/* Historial */}
          <div className="bg-green-50 border p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center text-green-600">
              <FaHistory className="mr-2" /> Historial
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>🔌 Pedro Sánchez - Cableado interior</li>
              <li>🛠️ Rosa Martínez - Reparación de contactos</li>
            </ul>
          </div>

          {/* Servicios ofrecidos */}
          <div className="bg-yellow-50 border p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center text-yellow-600">
              <FaBriefcase className="mr-2" /> Servicios ofrecidos
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✅ Instalación de focos</li>
              <li>✅ Cableado interior</li>
              <li>✅ Reparaciones eléctricas</li>
            </ul>
          </div>
        </div>

        {/* Disponibilidad */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-bold text-lg mb-2">Disponibilidad</h3>
          <p>Lunes a Viernes - 9:00 AM a 6:00 PM</p>
          <p>📍 Zona: Tehuacán</p>
        </div>

        {/* Acciones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => router.push('/trabajador/historial')}
            className="flex items-center justify-center gap-2 p-4 bg-white border rounded hover:bg-gray-50"
          >
            <FaHistory className="text-blue-600" />
            Historial
          </button>
          <button
            onClick={() => router.push('/trabajador/activos')}
            className="flex items-center justify-center gap-2 p-4 bg-white border rounded hover:bg-gray-50"
          >
            <FaTasks className="text-yellow-600" />
            Activos
          </button>
          <button
            onClick={() => router.push('/trabajador/servicios')}
            className="flex items-center justify-center gap-2 p-4 bg-white border rounded hover:bg-gray-50"
          >
            <FaBriefcase className="text-green-600" />
            Servicios
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('rol');
              router.push('/login');
            }}
            className="flex items-center justify-center gap-2 p-4 bg-white border rounded hover:bg-red-100 text-red-600"
          >
            <FaSignOutAlt />
            Cerrar sesión
          </button>
        </div>
      </div>
    </main>
  );
}
