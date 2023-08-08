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

const salesTrackingSchema = new Schema({
  product: {
    codigo: { type: String, default: ""},
    titulo: { type: String, default: ""},
    precio: { type: Number, default: 0},
    tallas: {
        S: [colorSchema],
        M: [colorSchema],
        L: [colorSchema],
        XL: [colorSchema],
      },
  },
  
//   revenue: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now },
});

const SalesTracking = mongoose.model('SalesTracking', salesTrackingSchema);
module.exports = SalesTracking;