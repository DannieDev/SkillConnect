'use client';
import Link from 'next/link';
import { FaHome, FaGlobe, FaCog, FaEnvelope, FaBell, FaSignOutAlt } from 'react-icons/fa';

const servicios = [
  { id: 1, titulo: "Limpieza de sala", precio: 350, categoria: "Limpieza", img: "/images/sala.png" },
  { id: 2, titulo: "Instalación de mini split", precio: 800, categoria: "Electricidad", img: "/images/aire-acondicionado.png" },
  { id: 3, titulo: "Servicio de plomería", precio: 400, categoria: "Plomería", img: "/images/plomeria.png" },
  { id: 4, titulo: "Reparación de microondas", precio: 380, categoria: "Electrodomésticos", img: "/images/reparando-microondas.png" },
  { id: 5, titulo: "Ensamble de muebles", precio: 320, categoria: "Mantenimiento", img: "/images/tecnico.png" },
  { id: 6, titulo: "Revisión instalación eléctrica", precio: 450, categoria: "Electricidad", img: "/images/instalacion.png" },
  { id: 7, titulo: "Mantenimiento de jardín", precio: 300, categoria: "Jardinería", img: "/images/jardinero.png" },
  { id: 8, titulo: "Limpieza corporativa", precio: 550, categoria: "Limpieza", img: "/images/persona-limpiando.png" }
];

export default function ClienteHome() {
  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col items-center py-8">
        <img src="/images/logo.png" alt="Logo" className="w-68 mb-6" />
        <nav className="flex flex-col gap-7 text-lg text-gray-800 w-full px-6">
          <a href="#" className="flex items-center gap-3 hover:text-blue-600">
            <FaHome className="text-2xl" /> Inicio
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-blue-600">
            <FaGlobe className="text-2xl" /> Explora
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-blue-600">
            <FaCog className="text-2xl" /> Ajustes
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-blue-600">
            <FaEnvelope className="text-2xl" /> Mensaje
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-blue-600">
            <FaBell className="text-2xl" /> Notificaciones
          </a>
          <a href="#" className="flex items-center gap-3 text-red-600 hover:text-red-800 mt-4">
            <FaSignOutAlt className="text-2xl" /> Salir
          </a>
        </nav>

        {/* Perfil del usuario */}
        <div className="mt-auto w-full px-6">
          <div className="flex items-center gap-3 border-t pt-4">
            <img src="/images/user.jpg" alt="Usuario" className="w-10 h-10 rounded-full object-cover" />
            <div className="text-sm">
              <p className="font-semibold">John Doe</p>
              <p className="text-gray-500 text-xs">john@xyztek.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-2">Inicio</h1>
        <p className="text-lg text-gray-600 mb-6">¡Bienvenido, John!</p>

        {/* Buscador */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Buscar trabajadores, servicios o categorías..."
            className="flex-1 border px-4 py-2 rounded-md shadow-sm text-base"
          />
          <select className="border px-3 py-2 rounded-md text-base">
            <option>Categoría</option>
          </select>
          <select className="border px-3 py-2 rounded-md text-base">
            <option>Disponibilidad</option>
          </select>
          <select className="border px-3 py-2 rounded-md text-base">
            <option>Fecha de servicio</option>
          </select>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Nuevos Profesionales Disponibles</h2>
        <p className="text-base text-gray-600 mb-6">
          Descubre a los nuevos trabajadores disponibles en tu zona. Revisa perfiles verificados, experiencia y calificaciones reales.
        </p>

        {/* Grid de trabajadores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {servicios.map((t) => (
            <Link key={t.id} href={`/cliente/detalle/${t.id}`}>
              <div className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition">
                <img src={t.img} alt={t.titulo} className="w-full h-68 object-contain rounded-lg mb-3" />
                <h3 className="text-sm text-gray-500">{t.categoria}</h3>
                <h2 className="text-lg font-semibold">{t.titulo}</h2>
                <p className="text-base text-gray-600">${t.precio}</p>
                <span className="text-blue-500 hover:underline mt-1 inline-block">Ver más</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
