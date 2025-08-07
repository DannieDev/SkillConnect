import { NextResponse } from 'next/server';
import Publicacion from '@/models/publicacion';
import { verifyToken } from '@/middlewares/verifyToken';
import { verify, JwtPayload } from 'jsonwebtoken';
import connectDB from '@/lib/dbConnect';

interface DecodedToken extends JwtPayload {
  id: string;
  tipo: 'trabajador' | 'cliente';
}

// DELETE /api/publicaciones/[id]
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  let decoded: DecodedToken;
  try {
    decoded = verify(token, process.env.JWT_SECRET!) as DecodedToken;
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const userId = decoded.id;

  const publicacion = await Publicacion.findById(id);
  if (!publicacion || publicacion.trabajadorId.toString() !== userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  await Publicacion.findByIdAndDelete(id);
  return NextResponse.json({ mensaje: 'Eliminado correctamente' });
}

// GET /api/publicaciones/[id]
export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const decoded = verifyToken(req) as DecodedToken;
  const userId = decoded.id;

  const publicacion = await Publicacion.findById(params.id);

  if (!publicacion || publicacion.trabajadorId.toString() !== userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  return NextResponse.json(publicacion);
}
