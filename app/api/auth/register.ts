import { connectDB } from '@/lib/db';
import Cliente from '@/models/cliente';
import Trabajador from '@/models/trabajador';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('📥 Llamada recibida en /api/auth/register');

  try {
    const { email, password, nombre, tipo, especialidad } = await req.json();
    await connectDB();

    const Modelo = tipo === 'trabajador' ? Trabajador : Cliente;
    const existente = await Modelo.findOne({ email });
    if (existente) {
      return NextResponse.json({ error: 'El usuario ya existe' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuarioData: any = {
      email,
      password: hashedPassword,
      nombre,
    };

    if (tipo === 'trabajador') {
      nuevoUsuarioData.especialidad = especialidad;
    }

    const nuevoUsuario = await Modelo.create(nuevoUsuarioData);

    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
  console.error('❌ Error en el registro:', error);
  return NextResponse.json({ error: 'Error en el registro' }, { status: 500 });
}
}
