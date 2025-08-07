import { NextResponse } from 'next/server';
import { verifyToken } from '@/middlewares/verifyToken';
import dbConnect from '@/lib/dbConnect';
import Publicacion from '@/models/publicacion';

interface DecodedToken {
  id: string;
  tipo: 'trabajador' | 'cliente';
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const decoded = verifyToken(req) as DecodedToken;
    if (decoded.tipo !== 'trabajador') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const publicaciones = await Publicacion.find({
      trabajadorId: decoded.id
    }).sort({ createdAt: -1 });

    return NextResponse.json(publicaciones);
  } catch (err: unknown) {
    const error = err as Error;
    console.error('❌ Error en GET /publicaciones/mias:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
