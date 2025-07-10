'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
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
  const [usuario, setUsuario] = useState<{ nombre: string, email: string } | null>(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const res = await axios.get('/api/auth/userinfo');
        setUsuario(res.data.usuario);
      } catch (err) {
        console.error('Error al obtener usuario', err);
      }
    };
    obtenerUsuario();
  }, []);

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
    <div className="flex flex-col md:flex-row h-screen overflow-hidden font-sans">
      {/* Sidebar */}
        <aside className="hidden md:flex w-full md:w-64 bg-white shadow-lg flex-col items-center justify-center py-8">
        <img src="/images/logo.png" alt="Logo" className="w-40 mb-6" />
          <nav className="flex flex-col gap-6 text-sm w-full px-6 items-center">
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600"><FaHome className="text-lg" /> Inicio</a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600"><FaGlobe className="text-lg" /> Explora</a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600"><FaCog className="text-lg" /> Ajustes</a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600"><FaEnvelope className="text-lg" /> Mensajes</a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600"><FaBell className="text-lg" /> Notificaciones</a>
          <a href="#" className="flex items-center gap-2 text-red-600 hover:text-red-800 mt-2"><FaSignOutAlt className="text-lg" /> Salir</a>
        </nav>
        <div className="mt-auto w-full px-6 border-t pt-4">
          <div className="flex items-center gap-3">
            <img src="/images/user.jpg" alt="Usuario" className="w-10 h-10 rounded-full object-cover" />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">{usuario?.nombre ?? 'Cargando...'}</p>
              <p className="text-gray-500 text-xs">{usuario?.email ?? ''}</p>
            </div>
          </div>
          <div className="mt-2">
            <Link href="/dashboard/cliente/perfil" className="text-blue-600 text-sm font-medium hover:underline">
              👤 Ver perfil
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-5 md:p-10 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-1">Inicio</h1>
        <p className="text-sm text-gray-500 mb-4">¡Bienvenido{usuario?.nombre ? `, ${usuario.nombre}` : ''}!</p>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          <input
            type="text"
            placeholder="Buscar servicios..."
            className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto"
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
            className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto"
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
            className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto"
          />
        </div>

        {/* Servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviciosFiltrados.map((s) => (
            <Link key={s.id} href={`/cliente/detalle/${s.id}`}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer">
                <img src={s.img} alt={s.titulo} className="w-full h-44 object-cover rounded mb-3" />
                <p className="text-sm text-gray-500">{s.categoria}</p>
                <h2 className="text-lg font-semibold text-gray-800">{s.titulo}</h2>
                <p className="text-gray-700 font-medium mb-1">${s.precio}</p>
                <p className="text-xs text-gray-400">Disponible: {s.disponibilidad}</p>
                <p className="text-xs text-gray-400 mb-2">Fecha: {s.fecha}</p>
                <span className="text-blue-500 text-sm font-medium hover:underline">Ver más</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
