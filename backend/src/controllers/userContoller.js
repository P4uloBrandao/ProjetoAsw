const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  dataNascimento: {
    type: Date,
    required: true
  },
  genero: {
    type: String,
    enum: ['F', 'M', 'Outro'],
    required: true
  },
  morada: {
    type: String,
    required: true
  },
  localidade: {
    type: String,
    required: true
  },
  codigoPostal: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  preferencias: {
    categorias: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    marcas: [{ type: Schema.Types.ObjectId, ref: 'Brand' }]
  },
  carrinho: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantidade: { type: Number, default: 1 },
    }
  ],
  favoritos: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      dataAdicionado: { type: Date, default: Date.now },
    }
  ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
