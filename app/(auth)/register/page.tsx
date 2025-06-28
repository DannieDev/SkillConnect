'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'cliente',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRoleSelect = (role: string) => {
    setForm({ ...form, role });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.nombres ||
      !form.apellidos ||
      !form.email ||
      !form.password ||
      form.password !== form.confirmPassword
    ) {
      setError('Completa todos los campos y asegúrate que las contraseñas coincidan');
      return;
    }

    console.log('Registro:', form);
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sección izquierda (Formulario) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen p-8 bg-white">
<div className="w-full max-w-md h-[80vh] flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">Crear Cuenta</h1>

          {error && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              <ExclamationCircleIcon className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="flex gap-2">
              <input
                type="text"
                name="nombres"
                placeholder="Nombre(s)"
                value={form.nombres}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border border-gray-800 rounded-lg"
                required
              />
              <input
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                value={form.apellidos}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border border-gray-800 rounded-lg"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-800 rounded-lg"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-800 rounded-lg"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-800 rounded-lg"
              required
            />

            <div className="text-center text-sm font-medium text-gray-700">Continuar como</div>
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={() => handleRoleSelect('trabajador')}
                className={`w-1/2 px-4 py-2 border rounded-lg ${
                  form.role === 'trabajador'
                    ? 'bg-blue-100 border-blue-900'
                    : 'hover:bg-gray-100 border-gray-800'
                }`}
              >
                Trabajador
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('cliente')}
                className={`w-1/2 px-4 py-2 border rounded-lg ${
                  form.role === 'cliente'
                    ? 'bg-blue-100 border-blue-900'
                    : 'hover:bg-gray-100 border-gray-800'
                }`}
              >
                Cliente
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Registrarme
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">ó continuar con</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex gap-4">
            <button className="w-1/2 border px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
              <FcGoogle className="h-5 w-5" /> Google
            </button>
            <button className="w-1/2 border px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
              <FaGithub className="h-5 w-5" /> GitHub
            </button>
          </div>

          <div className="mt-6 text-end text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>

      {/* Sección derecha (Imagen) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-100">
        <Image
          src="/images/register.png" // o cambia a register.png si prefieres otra imagen
          alt="Registro"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
