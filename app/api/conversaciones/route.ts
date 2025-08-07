import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Conversacion from '@/models/conversacion';

interface ConversacionBody {
  usuario1: string;
  usuario2: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: ConversacionBody = await req.json();
    const { usuario1, usuario2 } = body;

    const existente = await Conversacion.findOne({
      participantes: { $all: [usuario1, usuario2] }
    });

    if (existente) {
      return NextResponse.json(existente);
    }

    const nueva = await Conversacion.create({ participantes: [usuario1, usuario2] });
    return NextResponse.json(nueva);
  } catch (error: unknown) {
    console.error('❌ Error en POST /conversaciones:', error);
    return NextResponse.json({ error: 'Error al crear conversación' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const conversaciones = await Conversacion.find().populate('participantes');
    return NextResponse.json(conversaciones);
  } catch (error: unknown) {
    console.error('❌ Error en GET /conversaciones:', error);
    return NextResponse.json({ error: 'Error al obtener conversaciones' }, { status: 500 });
  }
}
