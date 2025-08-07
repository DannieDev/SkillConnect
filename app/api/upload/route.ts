import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('imagen') as File;
    const usuarioId = formData.get('usuarioId') as string;

    if (!file || !usuarioId) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result: { secure_url: string } = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: `usuarios/${usuarioId}`, resource_type: 'image' },
        (error: Error | undefined, result: { secure_url?: string } | undefined) => {
          if (error || !result?.secure_url) return reject(error);
          resolve({ secure_url: result.secure_url });
        }
      ).end(buffer);
    });

    return NextResponse.json({ secure_url: result.secure_url });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('❌ Error en subida de imagen:', error.message);
    return NextResponse.json({ error: 'Error al subir imagen' }, { status: 500 });
  }
}
