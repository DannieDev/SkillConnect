'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarPublicacionPage() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/publicaciones/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error);
        } else {
          setTitulo(data.titulo);
          setDescripcion(data.descripcion);
          setCategoria(data.categoria);
          setImagen(data.imagen);
        }
      } catch (err) {
        setError('Error al cargar publicación');
      }
    };

    fetchPublicacion();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/publicaciones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, descripcion, categoria, imagen }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al actualizar');
      } else {
        setMensaje('✅ Publicación actualizada');
        setTimeout(() => router.push('/dashboard/trabajador'), 1500);
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Publicación</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {mensaje && <p className="text-green-600 mb-2">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL de imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
