import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface DecodedToken extends JwtPayload {
  nombre: string;
  email: string;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }

    const decoded = jwt.verify(token, secret) as DecodedToken;

    return NextResponse.json({
      usuario: {
        nombre: decoded.nombre,
        email: decoded.email
      }
    });
  } catch (error) {
    console.error('❌ Error al verificar token:', error);
    return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
  }
}
