const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  // criar uma collecionation
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
  tipo: { type: String, required: true },
  tamanho: { type: String, required: true },
  marca: { type: Schema.Types.ObjectId, ref: 'Marca', required: true },
  data: { type: Date, default: Date.now },
  condicao: { type: String, enum: ['excellent', 'very good', 'good', 'satisfactory'], required: true },
  preco: { type: Number, required: true },
  fotos: { type: [String], required: true },
  vendendor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comprador: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Product', productSchema);