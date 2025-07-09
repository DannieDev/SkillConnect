'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('/api/clientes')
      .then(res => res.json())
      .then(setClientes);
  }, []);

  const handleDelete = async (id) => {
    await fetch('/api/clientes', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    });
    setClientes(clientes.filter(c => c._id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link href="/dashboard/clientes/nuevo" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Nuevo Cliente
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente._id} className="border-t">
                <td className="py-3 px-4">{cliente.nombre}</td>
                <td className="py-3 px-4">{cliente.email}</td>
                <td className="py-3 px-4 space-x-2">
                  <Link href={`/dashboard/clientes/${cliente._id}`} className="text-blue-600 hover:underline">
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(cliente._id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}