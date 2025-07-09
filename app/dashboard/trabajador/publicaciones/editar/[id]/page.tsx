'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarPublicacionPage() {
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagenURL, setImagenURL] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchPublicacion = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/publicaciones/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      setDescripcion(data.descripcion);
      setCategoria(data.categoria);
      setImagenURL(data.imagen);
      setPreview(data.imagen);
    };

    fetchPublicacion();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNuevaImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const subirImagen = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('imagen', file);
    formData.append('usuarioId', 'temporal');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Error al subir la imagen: ${res.status}`);
      }

      const data = await res.json();
      if (!data.secure_url) {
        throw new Error('No se recibió URL segura');
      }

      return data.secure_url;
    } catch (err) {
      console.error('❌ Error subiendo imagen:', err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      let urlImagen = imagenURL;

      if (nuevaImagen) {
        const subida = await subirImagen(nuevaImagen);
        if (!subida) throw new Error('No se pudo subir la nueva imagen');
        urlImagen = subida;
      }

      const token = localStorage.getItem('token');
      const res = await fetch(`/api/publicaciones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ descripcion, categoria, imagen: urlImagen }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al actualizar');
      }

      setMensaje('✅ Publicación actualizada');
      setTimeout(() => router.push('/dashboard/trabajador'), 1500);
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Editar Publicación</h1>

      {error && <p className="text-red-600">{error}</p>}
      {mensaje && <p className="text-green-600">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border p-3 rounded-md resize-none"
          rows={4}
          required
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full border p-3 rounded-md bg-white"
        >
          <option value="">Selecciona una categoría</option>
          <option value="electricidad">Electricidad</option>
          <option value="jardinería">Jardinería</option>
          <option value="limpieza">Limpieza</option>
          <option value="plomería">Plomería</option>
        </select>

        {/* Imagen actual o vista previa */}
        {preview && (
          <img
            src={preview}
            alt="Vista previa"
            className="w-full max-h-64 object-cover rounded-md"
          />
        )}

        {/* Input de archivo */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-500 file:to-blue-500 file:text-white hover:file:from-purple-600 hover:file:to-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
