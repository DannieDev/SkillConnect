// models/cliente.ts
import mongoose, { Schema, model, models } from 'mongoose';

const clienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String },
  telefono: { type: String },
  direccion: { type: String },
  email: { type: String, required: true, unique: true }, // ← antes estaba como "correo"
  password: { type: String, required: true },
  foto: { type: String },
}, { timestamps: true });

const Cliente = models.Cliente || model('Cliente', clienteSchema);
export default Cliente;
