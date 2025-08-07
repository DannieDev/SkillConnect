import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function subirImagen(filepath: string, usuarioId: string): Promise<UploadApiResponse> {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      folder: `usuarios/${usuarioId}`,
    });
    return result;
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error('Error al subir imagen a Cloudinary: ' + error.message);
  }
}

export { cloudinary };
