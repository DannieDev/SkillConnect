import mongoose, { Schema, model, models } from 'mongoose';

const trabajadorSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  servicios: [{
    type: Schema.Types.ObjectId,
    ref: 'Servicio'
  }]
}, {
  timestamps: true,
});

const Trabajador = models.Trabajador || model('Trabajador', trabajadorSchema);
export default Trabajador;
