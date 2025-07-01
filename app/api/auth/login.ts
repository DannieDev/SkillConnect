import { connectDB } from '@/lib/db';
import Cliente from '@/models/cliente';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const passwordValido = await bcrypt.compare(password, cliente.password);
    if (!passwordValido) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: cliente._id },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '2d' }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
  }
}
