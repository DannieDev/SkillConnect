import connectDB from '@/lib/dbConnect';
import Cliente from '@/models/cliente';
import Trabajador from '@/models/trabajador';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password, tipo } = await req.json();

    if (!email || !password || !tipo) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

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
        id: usuario._id.toString(),
        email: usuario.email,
        nombre: usuario.nombre,
        tipo: tipo
      },
      process.env.JWT_SECRET!,
      { expiresIn: '2h' }
    );

    // 🔧 Respuesta completa con el token y los datos del usuario
    const response = NextResponse.json({
      message: 'Login exitoso',
      token,
      usuario: {
        tipo,
        nombre: usuario.nombre,
        email: usuario.email,
        id: usuario._id.toString()
      }
    });

    // ✅ Establecer cookie segura y accesible solo por el servidor
    response.headers.set(
      'Set-Cookie',
      `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=7200`
    );

    return response;

  } catch (error) {
    console.error('❌ Error en el login:', error);
    return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
  }
}
