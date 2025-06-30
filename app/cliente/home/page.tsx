'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FaHome,
  FaGlobe,
  FaCog,
  FaEnvelope,
  FaBell,
  FaSignOutAlt
} from 'react-icons/fa';

const servicios = [
  { id: 1, titulo: "Limpieza de sala", precio: 350, categoria: "Limpieza", disponibilidad: "Mañana", fecha: "2024-07-01", img: "/images/sala.png" },
  { id: 2, titulo: "Instalación de mini split", precio: 800, categoria: "Electricidad", disponibilidad: "Tarde", fecha: "2024-07-03", img: "/images/aire-acondicionado.png" },
  { id: 3, titulo: "Servicio de plomería", precio: 400, categoria: "Plomería", disponibilidad: "Noche", fecha: "2024-07-01", img: "/images/plomeria.png" },
  { id: 4, titulo: "Reparación de microondas", precio: 380, categoria: "Electrodomésticos", disponibilidad: "Tarde", fecha: "2024-07-02", img: "/images/reparando-microondas.png" },
  { id: 5, titulo: "Ensamble de muebles", precio: 320, categoria: "Mantenimiento", disponibilidad: "Mañana", fecha: "2024-07-04", img: "/images/tecnico.png" },
  { id: 6, titulo: "Revisión instalación eléctrica", precio: 450, categoria: "Electricidad", disponibilidad: "Mañana", fecha: "2024-07-05", img: "/images/instalacion.png" },
  { id: 7, titulo: "Mantenimiento de jardín", precio: 300, categoria: "Jardinería", disponibilidad: "Tarde", fecha: "2024-07-06", img: "/images/jardinero.png" },
  { id: 8, titulo: "Limpieza corporativa", precio: 550, categoria: "Limpieza", disponibilidad: "Noche", fecha: "2024-07-07", img: "/images/persona-limpiando.png" }
];

export default function ClienteHome() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [disponibilidadFiltro, setDisponibilidadFiltro] = useState('');
  const [fechaFiltro, setFechaFiltro] = useState('');

  const serviciosFiltrados = servicios.filter((s) => {
    const coincideBusqueda =
      s.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.categoria.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria = categoriaFiltro ? s.categoria === categoriaFiltro : true;
    const coincideDisponibilidad = disponibilidadFiltro ? s.disponibilidad === disponibilidadFiltro : true;
    const coincideFecha = fechaFiltro ? s.fecha === fechaFiltro : true;

    return coincideBusqueda && coincideCategoria && coincideDisponibilidad && coincideFecha;
  });

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col items-center py-8">
        <img src="/images/logo.png" alt="Logo" className="w-44 mb-4 ml-4 -mt-2" />
        <nav className="flex flex-col gap-7 text-base text-gray-800 w-full px-6">
         <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaHome className="text-xl" /> Inicio</a>
        <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaGlobe className="text-xl" /> Explora</a>
         <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaCog className="text-xl" /> Ajustes</a>
        <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaEnvelope className="text-xl" /> Mensaje</a>
         <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaBell className="text-xl" /> Notificaciones</a>
       <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"><FaSignOutAlt className="text-xl" /> Salir</a>
        </nav>

        {/* Perfil del usuario */}
        <div className="mt-auto w-full px-6">
          <div className="flex items-center gap-3 border-t pt-4">
            <img src="/images/user.jpg" alt="Usuario" className="w-10 h-10 rounded-full object-cover" />
            <div className="text-sm leading-tight">
              <p className="font-semibold text-gray-900">John Doe</p>
              <p className="text-gray-500 text-xs">john@xyztek.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 p-10 overflow-auto">
       <h1 className="text-2xl font-semibold mb-1">Inicio</h1>
       <p className="text-sm text-gray-500 mb-4">¡Bienvenido, John!</p>


        {/* Buscador y filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          <input
            type="text"
            placeholder="Buscar servicios..."
            className="border px-5 py-[5px] rounded-md text-sm"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="border px-5 py-[5px] rounded-md text-sm"
          >
            <option value="">Categoría</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Electricidad">Electricidad</option>
            <option value="Plomería">Plomería</option>
            <option value="Electrodomésticos">Electrodomésticos</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Jardinería">Jardinería</option>
          </select>

          <select
            value={disponibilidadFiltro}
            onChange={(e) => setDisponibilidadFiltro(e.target.value)}
            className="border px-5 py-[5px] rounded-md text-sm"
          >
            <option value="">Disponibilidad</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>

          <input
            type="date"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
            className="border px-5 py-[5px] rounded-md text-sm"
          />
        </div>

        {/* Grid de trabajadores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {serviciosFiltrados.map((s) => (
            <Link key={s.id} href={`/cliente/detalle/${s.id}`}>
              <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer">
                <img src={s.img} alt={s.titulo} className="w-full h-48 object-contain rounded mb-3" />
                <h3 className="text-sm text-gray-500">{s.categoria}</h3>
                <h2 className="text-lg font-semibold">{s.titulo}</h2>
                <p className="text-base text-gray-600">${s.precio}</p>
                <p className="text-xs text-gray-400">Disponible: {s.disponibilidad}</p>
                <p className="text-xs text-gray-400">Fecha: {s.fecha}</p>
                <span className="text-blue-500 hover:underline mt-1 inline-block">Ver más</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
