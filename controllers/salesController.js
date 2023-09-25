const SalesTracking = require('../model/SalesTracking');
const Product = require('../model/Products');

// Function to calculate the total quantity sold and revenue for a sale
const getAllSales = async (req, res) => {
  const sale = await SalesTracking.find();
  if (!sale) return res.status(204).json({ 'message': 'No Sale found.' });
  res.json(sale);
}

const updateProductQuantity = async (codigo, size, color, quantity) => {
    try {
      const product = await Product.findOne({ codigo });
      if (product) {
        const tallas = product.tallas;
        // tallas[size].find((item) => item.color === color).quantity -= quantity;
        await product.save();
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

const newSale = async (req, res) => {
    try {
        const { productos, referencia, metodo, total } = req.body;
        const savedRecords = [];

        let totalRevenue = 0;
        const calculateTotalRevenue = () => {
          
          productos.forEach((product) => {
            Object.values(product.tallas).forEach((colors) => {
              colors.forEach((color) => {
                const sold = parseInt(color.sold, 10) || 0;
                const precio = parseInt(product.precio, 10) || 0;
                totalRevenue += sold * precio;
              });
            });
          });
          
          return totalRevenue;
          // setTotal(totalRevenue)
        };
        calculateTotalRevenue()

        const salesRecord = new SalesTracking({
          product: productos,
          referencia,
          metodo,
          total: totalRevenue,
          date: new Date()
        });
    
        // Loop through the array of sales data and create a new sales tracking record for each sale
        for (const product of productos) {

         
          const { codigo, titulo, precio, tallas, tallas_zapatos } = product;
          
    
          // Create a new sales tracking record
          // const salesRecord = new SalesTracking({
          //   product: productos,
          //   referencia,
          //   metodo,
          //   total,
          //   date: new Date()
          // });
          // const salesRecord = new SalesTracking({
          //   product: {
          //     codigo,
          //     titulo,
          //     precio,
          //     tallas,
          //     tallas_zapatos,
          //   },
          //   date: new Date(),
          // });
    
          const savedRecord = await salesRecord.save();
          savedRecords.push(savedRecord);
    
          // Update the quantity in the Products model
          const productToUpdate = await Product.findOne({ codigo });
      if (productToUpdate) {
        productToUpdate.tallas = tallas;
        productToUpdate.tallas_zapatos = tallas_zapatos; // Update the entire "tallas" object in the product
        await productToUpdate.save();
      }

      
    }
    
        return res.status(201).json(savedRecords);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while creating sales tracking records' });
      }
}



const deleteSale = async (req, res) => {
  const saleId = req.params.id; // Get the product ID from URL parameter
  console.log(saleId)

  if (!saleId) {
      return res.status(400).json({ 'message': 'Product ID required.' });
  }

  // ... rest of your code ...

  try {
      const sale = await SalesTracking.findOne({ _id: saleId }).exec();
      if (!sale) {
          return res.status(204).json({ "message": `No sale matches ID ${saleId}.` });
      }

      console.log(sale)

      for (const product of sale.product) {
        const { codigo, sold } = product;
        const productToUpdate = await Product.findOne({ codigo });

      //   if (productToUpdate) {
      //     console.log(productToUpdate)
      //     productToUpdate.cantidad += sold; // Update the quantity by adding the sold quantity
      //     await productToUpdate.save();
      //   }
      // }

      // if (productToUpdate) {
      //   for (const [, sizes] of Object.entries(productToUpdate)) {
          
      //     for (const size of sizes) {
      //       console.log(size)
      //       size.quantity += sold; // Update the quantity by adding the sold quantity
      //     }
      //   }

      //   await productToUpdate.save();
      // }

      if(productToUpdate) {

        console.log(productToUpdate)
         
          // Object.entries(product?.tallas).map(([size, colors])=>
          // colors.map((color, index) =>
          // color.quantity > 0 && 
            
          Object.entries(productToUpdate?.tallas).map(([size, colors]) => {

            console.log(colors)
            
            colors.map((color, index) =>{
              console.log(color)
              color.quantity += color.sold
            }
              
            )
          }
          
          )
          
      }

      await productToUpdate.save();
    }

      const result = await SalesTracking.deleteOne({ _id: saleId });
      res.json(result);
  } catch (err) {
      console.error(err);
      res.status(500).json({ "message": "Server Error" });
  }
}


module.exports = { newSale, getAllSales, deleteSale}