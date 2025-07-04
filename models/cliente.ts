import mongoose, { Schema, model, models } from 'mongoose';

const ClienteSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  telefono: { type: String },
  direccion: { type: String },
  rol: { type: String, default: 'cliente' },
}, { timestamps: true });

export default models.Cliente || model('Cliente', ClienteSchema);
