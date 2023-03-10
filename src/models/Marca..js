const mongoose = require('mongoose');

const marcaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Marca', brandSchema);
