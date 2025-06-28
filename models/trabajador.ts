import { Schema, model } from 'mongoose';

const trabajadorSchema = new Schema({
  nombre: { type: String, required: true },
  especialidad: { type: String, required: true },
  disponibilidad: { type: Boolean, default: true },
  rating: { type: Number, min: 1, max: 5 }
});

export const Cliente = model('Trabajador', trabajadorSchema);