const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
  color: {
    type: String,
    // required: true,
    default: ""
  },
  quantity: {
    type: Number,
    // required: true,
    default: 0,
  },
});



const productSchema = new Schema({
  titulo: {
    type: String,
    // required: true,
  },
  descripcion: {
    type: String,
    // required: true,
    default: "",
  },
  precio: {
    type: Number,
    // required: true,
    default: 0,
  },
  precio_mayor: {
    type: Number,
    // required: true,
    default: 0,
  },
  tipo: {
    type: String,
    // required: true,
    default: "",
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
  
  codigo: {
    type: String,
    default: "",
  },
  sexo: {
    type: String,
    default: "",
  },
  imagen: {
    type: String,
    default: "",
  },
  
  imagenes: {
    type: Array,
    default: [],
  },

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const productSchema = new Schema({
//     titulo: {
//         type: String,
//         required: true
//     },
//     descripcion: {
//         type: String,
//         required: true,
//         default: ""
//     },
//     precio: {
//         type: Number,
//         required: true,
//         default: 0
//     },
//     cantidad: {
//         type: Number,
//         required: true,
//         default: 0
//     },
//     imagen: {
//         type: String
//     },
//     talla_S: {
//         type: Boolean,
//         required: true,
//         default: false,
//     },
//     talla_M: {
//         type: Boolean,
//         required: true,
//         default: false,
//     },
//     talla_L: {
//         type: Boolean,
//         required: true,
//         default: false,
//     },
//     talla_XL: {
//         type: Boolean,
//         required: true,
//         default: false,
//     }
//     // talla: {
//     //     S: {
//     //         type: Boolean,
//     //         required: true,
//     //         default: false,
//     //     },
//     //     M: {
//     //         type: Boolean,
//     //         required: true,
//     //         default: false,
//     //     },
//     //     L: {
//     //         type: Boolean,
//     //         required: true,
//     //         default: false,
//     //     },
//     //     XL: {
//     //         type: Boolean,
//     //         required: true,
//     //         default: false,
//     //     }
//     // }
// }, {timestamps: true,});

// module.exports = mongoose.model('Products', productSchema);