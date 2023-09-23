const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    color: {
      type: String,
      default: ""
    },
    quantity: {
      type: Number,
      
      default: 0,
    },
    sold: {
        type: Number,
        
        default: 0
    }
  });

// const salesTrackingSchema = new Schema({
//   product: {
//     codigo: { type: String, default: ""},
//     titulo: { type: String, default: ""},
//     precio: { type: Number, default: 0},
//     tallas: {
//       'U': [colorSchema],
//       'XS': [colorSchema],
//       'S': [colorSchema],
//       'M': [colorSchema],
//       'L': [colorSchema],
//       'XL': [colorSchema],
//       '0XL': [colorSchema],
//       '1XL': [colorSchema],
//       '2XL': [colorSchema],
//       '3XL': [colorSchema],
//       '4XL': [colorSchema],
//       '5XL': [colorSchema],
//       'FIT': [colorSchema],
//     },
//     tallas_zapatos: {
//       '25': [colorSchema],
//       '26': [colorSchema],
//       '27': [colorSchema],
//       '28': [colorSchema],
//       '29': [colorSchema],
//       '30': [colorSchema],
//       '31': [colorSchema],
//       '32': [colorSchema],
//       '33': [colorSchema],
//       '34': [colorSchema],
//       '35': [colorSchema],
//       '36': [colorSchema],
//       '37': [colorSchema],
//       '38': [colorSchema],
//       '39': [colorSchema],
//       '40': [colorSchema],
//       '41': [colorSchema],
//       '42': [colorSchema],
//       '43': [colorSchema],
//       '44': [colorSchema],
      
      
//     },
//   },
  
// //   revenue: { type: Number, required: true, default: 0 },
//   date: { type: Date, default: Date.now },
// });

const salesTrackingSchema = new Schema({
  product: [{
    codigo: { type: String, default: "" },
    titulo: { type: String, default: "", required: true },
    precio: { type: Number, default: 0 },
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
  }],
  total: { type: Number, default: 0 },
  referencia: { type: String, default: "" },
  metodo: { type: String, default: "" },
  date: { type: Date, default: Date.now }
});

const SalesTracking = mongoose.model('SalesTracking', salesTrackingSchema);
module.exports = SalesTracking;