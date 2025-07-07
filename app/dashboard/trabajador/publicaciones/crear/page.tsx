'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CrearPublicacionPage() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('limpieza');
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!titulo || !descripcion || !imagen) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      formData.append('categoria', categoria);
      formData.append('imagen', imagen);

      const token = localStorage.getItem('token');

      const res = await fetch('/api/publicaciones', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al crear publicación');
        return;
      }

      router.push('/dashboard/trabajador');
    } catch (err) {
      console.error(err);
      setError('Error inesperado');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Crear nueva publicación</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          className="w-full p-2 border rounded"
        />

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del servicio"
          rows={4}
          className="w-full p-2 border rounded"
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="limpieza">Limpieza</option>
          <option value="electricidad">Electricidad</option>
          <option value="plomería">Plomería</option>
          <option value="jardinería">Jardinería</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />

        {preview && (
          <img src={preview} alt="Vista previa" className="w-32 h-32 object-cover mt-2 rounded" />
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}
