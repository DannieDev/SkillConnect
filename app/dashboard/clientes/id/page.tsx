'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// 1. Define el tipo para los datos del formulario
type ClienteFormValues = {
  nombre: string;
  email: string;
  telefono?: string;
};

// 2. Tipo para los parámetros de la ruta
type ClienteFormParams = {
  id: string;
};

// 3. Tipo para las props del componente
type ClienteFormProps = {
  params: ClienteFormParams;
};

export default function ClienteForm({ params }: ClienteFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ClienteFormValues>();
  const router = useRouter();
  const isEdit = params.id !== 'nuevo';

  // 4. Cargar datos para edición
  useEffect(() => {
    if (isEdit) {
      fetch(`/api/clientes?id=${params.id}`)
        .then(res => {
          if (!res.ok) throw new Error('Error al cargar cliente');
          return res.json();
        })
        .then((data: ClienteFormValues) => {
          setValue('nombre', data.nombre);
          setValue('email', data.email);
          if (data.telefono) setValue('telefono', data.telefono);
        })
        .catch(error => console.error('Error:', error));
    }
  }, [params.id, isEdit, setValue]);

  // 5. Tipado explícito para el submit
  const onSubmit = async (data: ClienteFormValues) => {
    try {
      const url = isEdit ? `/api/clientes?id=${params.id}` : '/api/clientes';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Error al guardar');

      router.push('/dashboard/clientes');
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al guardar los datos');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        {isEdit ? 'Editar Cliente' : 'Nuevo Cliente'}
      </h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
        <input
          {...register('nombre', { required: 'Este campo es obligatorio' })}
          className={`w-full p-2 border rounded-lg ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          type="email"
          {...register('email', { 
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido'
            }
          })}
          className={`w-full p-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
        <input
          type="tel"
          {...register('telefono')}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push('/dashboard/clientes')}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEdit ? 'Actualizar Cliente' : 'Crear Cliente'}
        </button>
      </div>
    </form>
  );
}