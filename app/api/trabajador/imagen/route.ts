import { NextResponse } from 'next/server';
import { actualizarImagenPerfil } from '@/services/trabajadorService';
import { verifyToken } from '@/middlewares/verifyToken';

export async function PUT(req: Request) {
  try {
    const decoded = verifyToken(req);
    const { url } = await req.json();

    if ((decoded as any).rol !== 'trabajador') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const actualizado = await actualizarImagenPerfil((decoded as any).id, url);
    return NextResponse.json(actualizado);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
