const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    color: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  });
  
  const productOrderSchema = new Schema({
    productCode: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    tallas: {
      S: [colorSchema],
      M: [colorSchema],
      L: [colorSchema],
      XL: [colorSchema],
    },
  });
  
  const orderSchema = new Schema({
    products: [productOrderSchema],
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
  });
  

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
    pedidos: [orderSchema],
});

module.exports = mongoose.model('User', userSchema);