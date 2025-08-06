<<<<<<< HEAD
import mongoose from 'mongoose';

const mensajeSchema = new mongoose.Schema({
  conversacionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversacion', required: true },
  remitente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  leido: { type: Boolean, default: false },
});

export default mongoose.models.Mensaje || mongoose.model('Mensaje', mensajeSchema);
=======
import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IMensaje extends Document {
  conversacion: mongoose.Types.ObjectId;
  de: mongoose.Types.ObjectId;
  contenido: string;
  creadoEn: Date;
  leido: boolean;
}

const mensajeSchema = new Schema<IMensaje>({
  conversacion: { type: Schema.Types.ObjectId, ref: 'Conversacion', required: true },
  de: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  contenido: { type: String, required: true },
  creadoEn: { type: Date, default: Date.now },
  leido: { type: Boolean, default: false },
});

const Mensaje = models.Mensaje || model<IMensaje>('Mensaje', mensajeSchema);
export default Mensaje;
>>>>>>> 63cb45066278cbe0bd9c2974b2c03b007566cb92
