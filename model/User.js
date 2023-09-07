const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const cartItemSchema = require('./Cart');

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
    deseo: {type: Number, default: 0}
  });

//   const cartItemSchema = new Schema({
//     product: {
//         type: Schema.Types.ObjectId,
//         ref: 'Product', // You can replace 'Product' with the actual model name for your products
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     }
// });

const cartItemSchema = new Schema({
  product: {
          type: Schema.Types.ObjectId,
            ref: 'Product', // You can replace 'Product' with the actual model name for your products
           
        },
  nombre: {
      type: String
  },
  codigo: {
    type: String
},
  precio: {
    type: Number,
    
},
precio_mayor: {
  type: Number,
  default: 0,
  
},
  quantity: {
      type: Number,
      default: 0
  },
  imagen: {
    type: String,
    default: ''
  },
  tallas: {
    'U': [colorSchema],
    'XS': [colorSchema],
    'S': [colorSchema],
    'M': [colorSchema],
    'L': [colorSchema],
    'XL': [colorSchema],
    '0XL': [colorSchema],
    '1XL': [colorSchema],
    '2XL': [colorSchema],
    '3XL': [colorSchema],
    '4XL': [colorSchema],
    '5XL': [colorSchema],
    'FIT': [colorSchema],
  },
  tallas_zapatos: {
    '25': [colorSchema],
    '26': [colorSchema],
    '27': [colorSchema],
    '28': [colorSchema],
    '29': [colorSchema],
    '30': [colorSchema],
    '31': [colorSchema],
    '32': [colorSchema],
    '33': [colorSchema],
    '34': [colorSchema],
    '35': [colorSchema],
    '36': [colorSchema],
    '37': [colorSchema],
    '38': [colorSchema],
    '39': [colorSchema],
    '40': [colorSchema],
    '41': [colorSchema],
    '42': [colorSchema],
    '43': [colorSchema],
    '44': [colorSchema],
    
    
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
        required: true,
        unique: true,
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
    cart: [cartItemSchema] 
    // pedidos: [orderSchema],
});

module.exports = mongoose.model('User', userSchema);