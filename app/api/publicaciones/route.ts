import { NextResponse } from 'next/server';
import { verifyToken } from '@/middlewares/verifyToken';
import { subirImagen } from '@/lib/uploadImage';
import { crearPublicacion } from '@/services/publicacionService';
import formidable, { Fields, Files } from 'formidable';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface DecodedToken {
  id: string;
  tipo: 'trabajador' | 'cliente';
}

function parseForm(req: Request, headers: Headers): Promise<[Fields, Files]> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false, keepExtensions: true });

    const stream = Readable.fromWeb(req.body as unknown as ReadableStream);
    const nodeReq = Object.assign(stream, {
      headers: Object.fromEntries(headers.entries())
    });

    form.parse(nodeReq, (err, fields, files) => {
      if (err) return reject(err);
      resolve([fields, files]);
    });
  });
}

export async function POST(req: Request) {
  try {
    const decoded = verifyToken(req) as DecodedToken;
    const userId = decoded.id;

    const [fields, files] = await parseForm(req, req.headers);

    const titulo = fields.titulo?.[0];
    const descripcion = fields.descripcion?.[0];
    const precio = fields.precio?.[0];
    const disponibilidad = fields.disponibilidad?.[0];
    const fecha = fields.fecha?.[0];
    const categoria = fields.categoria?.[0] || 'general';
    const file = files.imagen?.[0];

    if (!titulo || !descripcion || !precio || !disponibilidad || !fecha || !file) {
      return NextResponse.json({ error: 'Campos obligatorios faltantes' }, { status: 400 });
    }

    const urlImagen = await subirImagen(file as File);

    const nuevaPublicacion = await crearPublicacion({
      titulo,
      descripcion,
      precio,
      disponibilidad,
      fecha,
      categoria,
      imagen: urlImagen,
      trabajadorId: userId
    });

    return NextResponse.json(nuevaPublicacion);
  } catch (err: unknown) {
    const error = err as Error;
    console.error('❌ Error al crear publicación:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
