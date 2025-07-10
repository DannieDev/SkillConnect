'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  FaSignOutAlt, FaHome, FaGlobe, FaCog, FaEnvelope, FaBell,
  FaBars, FaTimes, FaUser
} from 'react-icons/fa';
import Link from 'next/link';

export default function ClienteHome() {
  const router = useRouter();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: 'Cargando...', email: '' });

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

  const servicios = [
    { id: 1, titulo: 'Limpieza de sala', precio: 350, categoria: 'Limpieza', disponibilidad: 'Mañana', fecha: '2024-07-01', img: '/images/sala.png' },
    { id: 2, titulo: 'Instalación de mini split', precio: 800, categoria: 'Electricidad', disponibilidad: 'Tarde', fecha: '2024-07-03', img: '/images/aire-acondicionado.png' },
    { id: 3, titulo: 'Servicio de plomería', precio: 400, categoria: 'Plomería', disponibilidad: 'Noche', fecha: '2024-07-01', img: '/images/plomeria.png' },
    { id: 4, titulo: 'Reparación de microondas', precio: 380, categoria: 'Electrodomésticos', disponibilidad: 'Tarde', fecha: '2024-07-02', img: '/images/reparando-microondas.png' },
    { id: 5, titulo: 'Ensamble de muebles', precio: 320, categoria: 'Mantenimiento', disponibilidad: 'Mañana', fecha: '2024-07-04', img: '/images/tecnico.png' },
    { id: 6, titulo: 'Revisión instalación eléctrica', precio: 450, categoria: 'Electricidad', disponibilidad: 'Mañana', fecha: '2024-07-05', img: '/images/instalacion.png' },
    { id: 7, titulo: 'Mantenimiento de jardín', precio: 300, categoria: 'Jardinería', disponibilidad: 'Tarde', fecha: '2024-07-06', img: '/images/jardinero.png' },
    { id: 8, titulo: 'Limpieza corporativa', precio: 550, categoria: 'Limpieza', disponibilidad: 'Noche', fecha: '2024-07-07', img: '/images/persona-limpiando.png' }
  ];

  const [filtros, setFiltros] = useState({ busqueda: '', categoria: '', disponibilidad: '', fecha: '' });

  const serviciosFiltrados = servicios.filter((s) => {
    const b = filtros.busqueda.toLowerCase();
    return (
      (s.titulo.toLowerCase().includes(b) || s.categoria.toLowerCase().includes(b)) &&
      (!filtros.categoria || s.categoria === filtros.categoria) &&
      (!filtros.disponibilidad || s.disponibilidad === filtros.disponibilidad) &&
      (!filtros.fecha || s.fecha === filtros.fecha)
    );
  });

  return (
    <div className="relative min-h-screen bg-gray-50 lg:flex">
      {/* Botón hamburguesa solo en móviles */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-3xl text-gray-700">
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar corregido */}
     <aside className={`bg-white shadow-md fixed top-0 left-0 h-screen w-64 z-40 transform transition-transform duration-300
  ${menuAbierto ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
  <div className="h-full flex flex-col justify-between px-6 py-8">
    {/* Parte superior */}
    <div>
      <img src="/images/logo.png" alt="SkillConnect" className="h-10 mb-8" />
      <nav className="flex flex-col gap-4 text-sm text-gray-700">
        <a href="#" className="flex items-center gap-2 hover:text-blue-600"><FaHome /> Inicio</a>
        <a href="#" className="flex items-center gap-2 hover:text-blue-600"><FaGlobe /> Explora</a>
        <a href="#" className="flex items-center gap-2 hover:text-blue-600"><FaCog /> Ajustes</a>
        <a href="#" className="flex items-center gap-2 hover:text-blue-600"><FaEnvelope /> Mensajes</a>
        <a href="#" className="flex items-center gap-2 hover:text-blue-600"><FaBell /> Notificaciones</a>
        <button
          onClick={async () => {
            try {
              await axios.post('/api/auth/logout');
            } catch (err) {
              console.error('Error al cerrar sesión', err);
            } finally {
              router.push('/login');
            }
          }}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 mt-2 text-sm"
        >
          <FaSignOutAlt /> Salir
        </button>
      </nav>
    </div>

    {/* Parte inferior - Perfil */}
    <div className="border-t pt-4">
      <div className="flex items-center gap-3">
        <img src="/images/user.jpg" alt="Usuario" className="w-10 h-10 rounded-full object-cover" />
        <div className="text-sm">
          <p className="font-semibold text-gray-900">{usuario.nombre}</p>
          <p className="text-gray-500 text-xs">{usuario.email}</p>
        </div>
      </div>
      <div className="mt-2">
        <Link href="/dashboard/cliente/perfil" className="text-blue-600 text-sm font-medium hover:underline">
          <FaUser className="inline-block mr-1" /> Ver perfil
        </Link>
      </div>
    </div>
  </div>
</aside>

      {/* Contenido principal */}
      <main className="flex-1 p-5 md:p-10 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-1">Inicio</h1>
        <p className="text-sm text-gray-500 mb-4">¡Bienvenido{usuario?.nombre ? `, ${usuario.nombre}` : ''}!</p>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          <input type="text" placeholder="Buscar servicios..." className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto" value={filtros.busqueda} onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })} />
          <select value={filtros.categoria} onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })} className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto">
            <option value="">Categoría</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Electricidad">Electricidad</option>
            <option value="Plomería">Plomería</option>
            <option value="Electrodomésticos">Electrodomésticos</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Jardinería">Jardinería</option>
          </select>
          <select value={filtros.disponibilidad} onChange={(e) => setFiltros({ ...filtros, disponibilidad: e.target.value })} className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto">
            <option value="">Disponibilidad</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
          <input type="date" value={filtros.fecha} onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })} className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto" />
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
