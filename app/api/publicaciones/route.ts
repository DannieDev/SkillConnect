import { NextResponse } from 'next/server';
import { verifyToken } from '@/middlewares/verifyToken';
import { subirImagen } from '@/lib/uploadImage';
import { crearPublicacion } from '@/services/publicacionService';
import formidable from 'formidable';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req: Request, headers: Headers): Promise<[any, any]> {
  return new Promise(async (resolve, reject) => {
    const form = formidable({ multiples: false, keepExtensions: true });

    const stream = Readable.fromWeb(req.body as any); // Convierte el body en stream
    const nodeReq: any = stream;
    nodeReq.headers = Object.fromEntries(headers.entries()); // ✅ headers manuales

    form.parse(nodeReq, (err, fields, files) => {
      if (err) return reject(err);
      resolve([fields, files]);
    });
  });
}

export async function POST(req: Request) {
  try {
    const decoded = verifyToken(req);
    const userId = (decoded as any).id;

    const [fields, files] = await parseForm(req, req.headers);
    console.log('📥 Campos recibidos:', fields);
    console.log('📸 Archivos recibidos:', files);

    const titulo = fields.titulo?.[0];
    const descripcion = fields.descripcion?.[0];
    const categoria = fields.categoria?.[0] || 'general';
    const file = files.imagen?.[0];

    if (!titulo || !descripcion || !file) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const subida = await subirImagen(file.filepath, userId);

    const nueva = await crearPublicacion({
      titulo,
      descripcion,
      categoria,
      imagen: subida.secure_url,
      trabajadorId: userId,
    });

    return NextResponse.json(nueva, { status: 201 });
  } catch (err: any) {
    console.error('❌ Error al crear publicación:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
