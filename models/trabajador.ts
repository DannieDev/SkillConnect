import mongoose, { Schema, Document } from 'mongoose';

export interface ITrabajador extends Document {
  nombre: string;
  email: string;
  password: string;
  especialidad: string;
  calificacion?: number;
  certificaciones?: string[];
  fechaRegistro: Date;
  telefono?: string;
}

const trabajadorSchema = new Schema<ITrabajador>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  especialidad: { type: String, required: true },
  calificacion: { type: Number, default: 0 },
  certificaciones: [{ type: String }],
  fechaRegistro: { type: Date, default: Date.now },
  telefono: { type: String },
});

const Trabajador = mongoose.models.Trabajador || mongoose.model<ITrabajador>('Trabajador', trabajadorSchema);
export default Trabajador;