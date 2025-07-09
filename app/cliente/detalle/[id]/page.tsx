'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { servicios } from '../../../data/servicios';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';

dayjs.extend(relativeTime);

export default function DetalleServicio() {
  const { id } = useParams();
  const [servicio, setServicio] = useState<any>(null);
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const encontrado = servicios.find((s) => s.id === id);
    if (encontrado) {
      setServicio(encontrado);
      setComentarios(encontrado.comentarios || []);
    }
  }, [id]);

  const manejarComentario = () => {
    if (nuevoComentario.trim() === '') return;

    const nuevo = {
      nombre: 'John Doe',
      avatar: '/images/user.jpg',
      texto: nuevoComentario,
      fecha: new Date(),
    };

    setComentarios([nuevo, ...comentarios]);
    setNuevoComentario('');
  };

  if (!servicio) return <div className="p-10">Servicio no encontrado</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Botón volver */}
      <div className="mb-6">
        <Link href="/cliente/home">
          <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
            <FaArrowLeft />
            Volver al listado
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-semibold mb-4">Reseñas</h1>

      <div className="bg-white shadow p-6 rounded-md">
        {/* Encabezado título + favoritos */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold">{servicio.titulo}</h2>
          <button
            onClick={() => setFavorito(!favorito)}
            className="text-red-500 text-xl hover:scale-110 transition-transform"
            title="Guardar en favoritos"
          >
            {favorito ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-2">Fecha: {servicio.fecha}</p>

        {/* Estrellas */}
        <div className="flex text-yellow-400 mb-4 text-xl">
          {'★'.repeat(servicio.rating)}{'☆'.repeat(5 - servicio.rating)}
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Descripción</h3>
          <p className="text-gray-700">{servicio.descripcion}</p>
        </div>

        {/* Imágenes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 mt-2">
          {servicio.imagenes?.map((src: string, index: number) => (
            <Image
              key={index}
              src={src}
              alt={`Imagen ${index + 1}`}
              width={300}
              height={200}
              className="rounded-lg object-cover"
            />
          ))}
        </div>

        {/* Botón de contratar */}
        <div className="mb-10">
          <Link href={`/cliente/pago/${id}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow">
              Contratar este servicio
            </button>
          </Link>
        </div>

        <hr className="my-8" />

        {/* Comentarios */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Comentarios</h3>

          {/* Publicar comentario */}
          <div className="flex gap-3 items-start mb-6">
            <img
              src="/images/user.jpg"
              className="w-10 h-10 rounded-full object-cover"
              alt="usuario"
            />
            <div className="flex-1">
              <textarea
                placeholder="Escribe un comentario..."
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                className="w-full border p-2 rounded-md text-sm"
                rows={2}
              />
              <button
                onClick={manejarComentario}
                className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm"
              >
                Publicar
              </button>
            </div>
          </div>

          {/* Lista de comentarios */}
          <div className="space-y-4">
            {comentarios.map((c, i) => (
              <div
                key={i}
                className="bg-gray-50 p-4 rounded-md flex gap-3 items-start"
              >
                <img
                  src={c.avatar || '/images/user.jpg'}
                  alt={c.nombre}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{c.nombre}</p>
                  <p className="text-xs text-gray-500">{dayjs(c.fecha || new Date()).fromNow()}</p>
                  <p className="mt-1 text-sm text-gray-800">{c.texto}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <button
                  className="hover:text-blue-600"
                  onClick={() => {
                  const nuevos = [...comentarios];
                  nuevos[i].likes = (nuevos[i].likes || 0) + 1;
                  setComentarios(nuevos);
                  }}
                  >
                 👍 {c.likes || 0}
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
