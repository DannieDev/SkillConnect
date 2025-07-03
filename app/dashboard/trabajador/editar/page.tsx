'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSave } from 'react-icons/fa';

export default function EditarPerfilTrabajador() {
  const router = useRouter();

  const [nombre, setNombre] = useState('Brayan Omar');
  const [especialidad, setEspecialidad] = useState('Electricista Certificado');
  const [zona, setZona] = useState('Tehuacán');
  const [horario, setHorario] = useState('Lunes a Viernes - 9:00 AM a 6:00 PM');
  const [descripcion, setDescripcion] = useState('Soy un electricista con más de 5 años de experiencia...');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !especialidad || !zona || !horario || !descripcion) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Aquí iría la llamada al backend para guardar los datos actualizados
    console.log({ nombre, especialidad, zona, horario, descripcion });

    alert('Perfil actualizado exitosamente');
    router.push('/trabajador');
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">Editar Perfil de Trabajador</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Especialidad</label>
            <input
              type="text"
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Zona de trabajo</label>
            <input
              type="text"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Horario disponible</label>
            <input
              type="text"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Presentación / Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              <FaSave />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
