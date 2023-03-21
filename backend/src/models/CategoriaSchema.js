const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
  nome: { type: String, required: true },
});

module.exports = mongoose.model('Categoria', categoriaSchema);
