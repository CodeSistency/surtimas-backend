const SalesTracking = require('../model/SalesTracking');
const Product = require('../model/Products');

// Function to calculate the total quantity sold and revenue for a sale

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
        const { productos } = req.body;
        const savedRecords = [];
    
        // Loop through the array of sales data and create a new sales tracking record for each sale
        for (const product of productos) {
          const { codigo, titulo, precio, tallas } = product;
          
    
          // Create a new sales tracking record
          const salesRecord = new SalesTracking({
            product: {
              codigo,
              titulo,
              precio,
              tallas,
            },
            date: new Date(),
          });
    
          const savedRecord = await salesRecord.save();
          savedRecords.push(savedRecord);
    
          // Update the quantity in the Products model
          const productToUpdate = await Product.findOne({ codigo });
      if (productToUpdate) {
        productToUpdate.tallas = tallas; // Update the entire "tallas" object in the product
        await productToUpdate.save();
      }
    }
    
        return res.status(201).json(savedRecords);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while creating sales tracking records' });
      }
}

const createNewProduct = async (req, res) => {
    const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

    if (!req?.body?.titulo || !req?.body?.descripcion) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await Product.create({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            tallas: req.body.tallas,
            imagen: ""
            

        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {createNewProduct, newSale}