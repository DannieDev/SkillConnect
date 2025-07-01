import mongoose, { Schema, Document } from 'mongoose';

export interface ICliente extends Document {
  nombre: string;
  email: string;
  password: string;
  fechaRegistro: Date;
  telefono?: string;
}

const clienteSchema = new Schema<ICliente>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now },
  telefono: { type: String },
});

const Cliente = mongoose.models.Cliente || mongoose.model<ICliente>('Cliente', clienteSchema);
export default Cliente;

