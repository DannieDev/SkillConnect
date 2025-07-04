'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  FaHeart,
  FaRegHeart,
  FaHome,
  FaGlobe,
  FaCog,
  FaEnvelope,
  FaBell,
  FaSignOutAlt,
  FaBookmark,
  FaRegBookmark,
  FaRegComment,
} from 'react-icons/fa';

function MenuOpciones({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();

  const eliminar = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/publicaciones/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setConfirmDelete(false);
      setOpen(false);
      router.refresh();
    } else {
      alert('Error al eliminar publicación');
    }
  };

  const handleEditar = () => {
    router.push(`/dashboard/trabajador/publicaciones/editar/${id}`);
  };

  return (
    <div className="relative inline-block text-left z-50">
      {/* Botón de tres puntos */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-600 hover:text-black px-2 py-1 rounded-full text-xl"
        title="Opciones"
      >
        ⋯
      </button>

      {/* Menú desplegable */}
      {open && !confirmDelete && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg">
          <button
            onClick={handleEditar}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Editar
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Eliminar
          </button>
        </div>
      )}

      {/* Confirmación de eliminación */}
      {confirmDelete && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-red-300 rounded-md shadow-lg p-4 text-sm">
          <p className="text-gray-800 mb-3">¿Estás seguro de eliminar esta publicación?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setConfirmDelete(false);
                setOpen(false);
              }}
              className="px-3 py-1 text-gray-700 hover:text-black"
            >
              Cancelar
            </button>
            <button
              onClick={eliminar}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrabajadorHome() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [publicaciones, setPublicaciones] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [guardados, setGuardados] = useState<string[]>([]);
  const [mostrarMensajes, setMostrarMensajes] = useState(false);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const res = await axios.get('/api/auth/userinfo');
        setNombre(res.data.nombre);
        setEmail(res.data.email);
      } catch (error) {
        console.error('Error al obtener datos del trabajador:', error);
        router.push('/login');
      }
    };
    obtenerDatosUsuario();
  }, [router]);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/publicaciones/mias', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPublicaciones(data);
      setLikes(data.map((pub: any) => ({
        id: pub._id,
        liked: false,
        total: pub.likes || 0,
      })));
    };
    fetchPublicaciones();
  }, []);

  const toggleLike = (id: string) => {
    setLikes((prev) =>
      prev.map((l: any) =>
        l.id === id
          ? { ...l, liked: !l.liked, total: l.liked ? l.total - 1 : l.total + 1 }
          : l
      )
    );
  };

  const toggleGuardar = (id: string) => {
    setGuardados((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar izquierdo */}
      <aside className="w-70 bg-white shadow-md px-6 py-8 flex flex-col items-center fixed h-screen">
        <img src="/images/logo_corto.png" alt="SkillConnect" className="h-10 mb-8" />
        <img src="/images/foto_perfil.png" alt="Perfil" className="w-30 h-30 rounded-full border-4 border-white shadow-md mb-2 object-cover" />
        <h2 className="text-2xl font-bold">{nombre || 'Nombre del trabajador'}</h2>
        <p className="text-sm text-gray-600">{email || 'correo@ejemplo.com'}</p>
        <div className="flex gap-4 text-center mb-6">
          <div><p className="font-bold text-x">{publicaciones.length}</p><span className="text-sm text-gray-600">Publicaciones</span></div>
          <div><p className="font-bold text-x">4.8</p><span className="text-sm text-gray-600">Calificación</span></div>
          <div><p className="font-bold text-x">30</p><span className="text-sm text-gray-600">Reseñas</span></div>
        </div>
        <nav className="flex flex-col gap-7 text-base text-gray-800 w-full px-2">
          <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition"><FaHome /> Inicio</a>
          <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition"><FaGlobe /> Explora</a>
          <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition"><FaCog /> Ajustes</a>
          <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition"><FaEnvelope /> Mensajes</a>
          <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition"><FaBell /> Notificaciones</a>
          <a href="#" className="flex items-center gap-2 text-red-500"><FaSignOutAlt /> Salir</a>
        </nav>
      </aside>

      {/* Panel derecho - Sugerencias */}
      <aside className="w-70 bg-white px-4 py-6 fixed right-0 top-0 h-screen overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold text-gray-700 px-2">Sugerencias para ti</h3>
        <ul className="mt-3 space-y-4 px-2">
          {["daelgg", "bethcast06", "ma.fer_mendoza"].map((user, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={`/images/user${i + 1}.jpg`} className="w-9 h-9 rounded-full object-cover" alt={user} />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{user}</p>
                  <p className="text-xs text-gray-500">Sugerencia para ti</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm font-medium hover:underline">Seguir</button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="ml-64 mr-72 flex-1 overflow-y-auto bg-gray-50 scrollbar-hide">
        <div className="p-8">
          <section className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">¡Bienvenido! 👋</h1>
            <p className="text-gray-600 mb-4">Aquí puedes ver un resumen de tu actividad como trabajadora.</p>
          </section>

          <section className="transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Tus Publicaciones</h2>
              <Link href="/dashboard/trabajador/perfil" className="text-blue-600 hover:underline text-sm">Ver fotos</Link>
            </div>

            {publicaciones.map((pub: any) => {
              const likeState = likes.find((l: any) => l.id === pub._id);
              return (
                <div key={pub._id} className="bg-white shadow-md max-w-2xl mx-auto mb-6">
                  <div className="flex items-center gap-3 px-4 py-3 justify-between">
                    <div className="flex items-center gap-3">
                      <img src="/images/foto_perfil.png" className="w-10 h-10 rounded-full object-cover" alt="usuario" />
                      <span className="font-semibold text-sm text-gray-800">Tú</span>
                    </div>
                    <MenuOpciones id={pub._id} />
                  </div>

                  <img src={pub.imagen} alt="Publicación" className="w-full object-cover" />

                  <div className="px-4 pt-2 text-sm text-gray-800 space-y-1">
                    <p>Les gusta a <span className="font-semibold">alguien</span> y otras personas</p>
                    <p className="leading-snug">
                      <span className="font-semibold">Tú</span>{' '}
                      <span>{pub.descripcion.length > 70 ? pub.descripcion.slice(0, 70) + '...' : pub.descripcion}</span>
                    </p>
                    <button className="text-gray-500 hover:underline text-sm">Ver los {pub.comments || 0} comentarios</button>
                    <div className="text-gray-400 text-sm">Agrega un comentario...</div>
                  </div>

                  <div className="flex justify-between items-center px-4 py-3 text-gray-600 text-sm">
                    <div className="flex gap-4 items-center">
                      <button onClick={() => toggleLike(pub._id)} className={`flex items-center gap-1 transition-transform hover:scale-105 ${likeState?.liked ? 'text-red-500' : 'text-gray-800'}`}>
                        {likeState?.liked ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                        <span>{likeState?.total}</span>
                      </button>
                      <span className="flex items-center gap-1 text-gray-800"><FaRegComment className="text-xl" />{pub.comments || 0}</span>
                    </div>
                    <button onClick={() => toggleGuardar(pub._id)}>
                      {guardados.includes(pub._id)
                        ? <FaBookmark className="text-yellow-400 text-xl" />
                        : <FaRegBookmark className="text-black text-xl" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}
