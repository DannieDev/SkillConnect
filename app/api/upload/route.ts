// /app/api/imagenes/upload/route.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '@/middlewares/verifyToken';
import { subirImagen } from '@/lib/uploadImage';
import { parseForm } from '@/lib/paseForm'; // 👈 nueva función
import type { NextRequest } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    const userId = (decoded as any).id;

    const [fields, files] = await parseForm(req as any); // 👈 corrección clave
    const file = files.imagen?.[0];

    if (!file) throw new Error('No se encontró el archivo');
    console.log('🛠 Llamando subirImagen con:', file.filepath, userId);
    const result = await subirImagen(file.filepath, userId);



    return NextResponse.json({ url: result.secure_url });
  } catch (err: any) {
    console.error('❌ Error en subida:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
