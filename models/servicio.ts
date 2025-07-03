import mongoose, { Schema, model, models } from 'mongoose';

const ServicioSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  disponibilidad: { type: String, required: true },
  trabajadorId: { type: String, required: true },
}, {
  timestamps: true
});

const Servicio = models.Servicio || model('Servicio', ServicioSchema);
export default Servicio;
    

