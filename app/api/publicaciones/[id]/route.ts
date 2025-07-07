import { NextResponse } from 'next/server';
import Publicacion from '@/models/publicacion';
import { verifyToken } from '@/middlewares/verifyToken';
import connectDB from '@/lib/dbConnect';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const decoded = verifyToken(req);
    const userId = (decoded as any).id;

    const publicacion = await Publicacion.findById(params.id);

    if (!publicacion || publicacion.trabajadorId.toString() !== userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    await publicacion.deleteOne();

    return NextResponse.json({ message: 'Publicación eliminada' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const decoded = verifyToken(req);
  const userId = (decoded as any).id;

  const publicacion = await Publicacion.findById(params.id);

  if (!publicacion || publicacion.trabajadorId.toString() !== userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  return NextResponse.json(publicacion);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const decoded = verifyToken(req);
  const userId = (decoded as any).id;

  const body = await req.json();
  const { titulo, descripcion, categoria, imagen } = body;

  const publicacion = await Publicacion.findById(params.id);

  if (!publicacion || publicacion.trabajadorId.toString() !== userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  publicacion.titulo = titulo;
  publicacion.descripcion = descripcion;
  publicacion.categoria = categoria;
  publicacion.imagen = imagen;

  await publicacion.save();

  return NextResponse.json(publicacion);
}

