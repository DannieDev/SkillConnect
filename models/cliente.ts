import mongoose, { Schema, model, models } from 'mongoose';

const clienteSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Cliente = models.Cliente || model('Cliente', clienteSchema);
export default Cliente;
