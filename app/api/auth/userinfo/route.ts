import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Obtener el token desde la cookie
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Verificar y decodificar el token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

<<<<<<< HEAD
    // Retornar en el formato esperado por el frontend
    return NextResponse.json({
      usuario: {
        nombre: decoded.nombre,
        email: decoded.email
      }
=======
    // Retornar directamente nombre y email para el frontend
    return NextResponse.json({
      nombre: decoded.nombre,
      email: decoded.email
>>>>>>> 7c6a2d6a7940ab333cdbc97e572a6d78fb7d2a44
    });

  } catch (error) {
    console.error('❌ Error al verificar token:', error);
    return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
  }
}
