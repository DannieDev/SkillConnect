import { cloudinary } from './cloudinary';
import { UploadApiResponse } from 'cloudinary';

export async function subirImagen(filePath: string, userId: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `usuarios/${userId}`,
    });
    console.log('📦 Resultado de Cloudinary:', result.public_id);
    return result;
  } catch (error: any) {
    console.error('❌ Error al subir a Cloudinary:', error);
    throw new Error('Error al subir imagen a Cloudinary: ' + error.message);
  }
}

