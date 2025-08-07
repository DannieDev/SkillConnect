import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Mensaje from '@/models/mensaje';

interface MensajeBody {
  conversacionId: string;
  autorId: string;
  contenido: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: MensajeBody = await req.json();
    const { conversacionId, autorId, contenido } = body;

    const nuevoMensaje = await Mensaje.create({
      conversacion: conversacionId,
      autor: autorId,
      contenido
    });

    return NextResponse.json(nuevoMensaje);
  } catch (error: unknown) {
    console.error('❌ Error en POST /mensajes:', error);
    return NextResponse.json({ error: 'Error al crear mensaje' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const mensajes = await Mensaje.find()
      .populate('autor')
      .populate('conversacion');

    return NextResponse.json(mensajes);
  } catch (error: unknown) {
    console.error('❌ Error en GET /mensajes:', error);
    return NextResponse.json({ error: 'Error al obtener mensajes' }, { status: 500 });
  }
}
