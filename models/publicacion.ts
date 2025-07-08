import mongoose, { Schema, model, models } from 'mongoose';

const PublicacionSchema = new Schema({
  descripcion: { type: String, required: true },
  categoria: { type: String },
  imagen: { type: String, required: true },
  trabajadorId: {
    type: Schema.Types.ObjectId,
    ref: 'Trabajador',
    required: true,
  }
}, { timestamps: true });

export default models.Publicacion || model('Publicacion', PublicacionSchema);
