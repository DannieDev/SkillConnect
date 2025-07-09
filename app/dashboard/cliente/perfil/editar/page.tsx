'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditarPerfil() {
  const router = useRouter();

  const [cliente, setCliente] = useState({
    nombre: 'Miguel Torres',
    correo: 'miguel@example.com',
    telefono: '5512345678',
    direccion: 'CDMX, México',
    foto: '/images/user.jpg',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Aquí puedes enviar la info al backend más adelante
      console.log('Datos enviados:', cliente);
      router.push('/dashboard/cliente/perfil');
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <main className="flex-1 p-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Editar Perfil</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              name="correo"
              value={cliente.correo}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={cliente.telefono}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={cliente.direccion}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Foto (URL)</label>
            <input
              type="text"
              name="foto"
              value={cliente.foto}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Guardar cambios
          </button>
        </form>
      </main>
    </div>
  );
}
