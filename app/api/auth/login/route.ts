import connectDB from '@/lib/dbConnect';
import Cliente from '@/models/cliente';
import Trabajador from '@/models/trabajador';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password, tipo } = await req.json();

    await connectDB();

    const Modelo = tipo === 'trabajador' ? Trabajador : Cliente;
    const usuario = await Modelo.findOne({ email });

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
        tipo: tipo
      },
      process.env.JWT_SECRET!,
      { expiresIn: '2h' }
    );

    return NextResponse.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        tipo
      }
    });
  } catch (error) {
    console.error('❌ Error en el login:', error);
    return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
  }
}
