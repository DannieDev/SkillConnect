import { Schema, model } from 'mongoose';

const clienteSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  telefono: String,
  fechaRegistro: { type: Date, default: Date.now }
});

export const Cliente = model('Cliente', clienteSchema);