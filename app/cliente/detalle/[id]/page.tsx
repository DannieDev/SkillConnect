'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { servicios } from '../../../data/servicios';

export default function DetalleServicio() {
  const { id } = useParams();
  const [servicio, setServicio] = useState<any>(null);

  useEffect(() => {
    const encontrado = servicios.find(s => s.id === id);

    // Si no encuentra, usará valores mock
    setServicio(
      encontrado || {
        titulo: 'Limpieza de sala',
        fecha: 'Marzo 25, 2025',
        descripcion: 'Servicio completo de limpieza de sala...',
        imagenes: ['/images/sala.png'],
        rating: 5,
        comentarios: [
          { nombre: 'Laura Gómez', texto: 'Muy buena limpieza', tiempo: 'hace 3 horas' },
          { nombre: 'Carlos Pérez', texto: 'Excelente atención', tiempo: 'ayer' }
        ]
      }
    );
  }, [id]);

  if (!servicio) return <div className="p-10">Servicio no encontrado</div>;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1">Reseñas</h1>

      <div className="bg-white shadow p-4 rounded-md">
        <h2 className="text-2xl font-bold">{servicio.titulo}</h2>
        <p className="text-base">Fecha: {servicio.fecha}</p>

        {/* Estrellas */}
        <div className="flex text-yellow-400 mb-4 text-lg">
          {'★'.repeat(servicio.rating)}{'☆'.repeat(5 - servicio.rating)}
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Descripción</h3>
          <p className="text-base">{servicio.descripcion}</p>
        </div>

        {/* Imágenes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {servicio.imagenes.map((src: string, index: number) => (
            <Image
              key={index}
              src={src}
              alt={`Imagen ${index + 1}`}
              width={300}
              height={200}
              className="rounded object-cover"
            />
          ))}
        </div>

        {/* Botón de contratar */}
        <div className="mt-6 text-left">
          <Link href={`/cliente/pago/${id}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow">
              Contratar este servicio
            </button>
          </Link>
        </div>

        {/* Comentarios */}
        <div className="mt-10">
          <h3 className="font-semibold text-lg mb-2">Comentarios</h3>

          <textarea
            placeholder="Escribe un comentario..."
            className="w-full p-2 border rounded-md mb-2"
          ></textarea>
          <button className="px-4 py-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600">
            Publicar
          </button>

          <ul>
            {servicio.comentarios.map((c: any, i: number) => (
              <li key={i} className="border-t py-2">
                <p className="text-base font-semibold text-gray-800">{c.nombre}</p>
                <p className="text-sm text-gray-700">{c.texto}</p>
                <p className="text-xs text-gray-500">{c.tiempo}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
