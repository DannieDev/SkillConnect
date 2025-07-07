// pages/api/publicaciones/index.ts
import { IncomingForm } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import connectDB from '@/lib/dbConnect';
import Publicacion from '@/models/publicacion';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // Necesario para trabajar con formidable
  },
};

cloudinary.config({
  cloud_name: 'deq6ntb7q',
  api_key: '593673218855184',
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Error al procesar el formulario' });

    const { usuarioId, descripcion } = fields;
    const file = files.imagen as formidable.File;

    if (!usuarioId || !file) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    try {
      await connectDB();

      // Sube a Cloudinary
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: `usuarios/${usuarioId}`,
      });

      // Guarda en MongoDB
      const nuevaPublicacion = await Publicacion.create({
        usuarioId,
        descripcion,
        imagenUrl: result.secure_url,
      });

      return res.status(201).json(nuevaPublicacion);
    } catch (error) {
      return res.status(500).json({ error: 'Error al guardar la publicación' });
    }
  });
}
