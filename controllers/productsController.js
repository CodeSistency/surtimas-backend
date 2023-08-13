const Product = require('../model/Products');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



const getAllProducts = async (req, res) => {
    const product = await Product.find();
    if (!product) return res.status(204).json({ 'message': 'No Product found.' });
    res.json(product);
}

// const createNewProduct = async (req, res) => {

//     const imagenPrimaria = req.file ? req.file.filename : '';

//     if (!req?.body?.titulo || !req?.body?.descripcion || !req?.body?.precio || !req?.body?.tallas) {
//       return res.status(400).json({ 'message': 'Title, description, price, and sizes are required' });
//     }
  
//     try {
//       const result = await Product.create({
//         titulo: req.body.titulo,
//         descripcion: req.body.descripcion,
//         precio: req.body.precio,
//         // imagen_primaria: imagenPrimaria || "",
//         // imagenes_secundarias: req.body.images || [], // Si no se proporciona una imagen, dejar vacío
//         tallas: req.body.tallas,
//       });
  
//       res.status(201).json(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ 'message': 'Internal server error' });
//     }
//   }

// const createNewProduct = async (req, res) => {
//     if (!req?.body?.titulo || !req?.body?.descripcion || !req?.body?.precio || !req?.body?.tallas) {
//           return res.status(400).json({ 'message': 'Title, description, price, and sizes are required' });
//             }
//         console.log(req.body)

//     try {
//         const { titulo, descripcion, precio, tallas } = req.body;
    
//         // Crea un nuevo producto utilizando el modelo Product
//         const newProduct = new Product({
//           titulo,
//           descripcion,
//           precio,
//           tallas,
//         });
    
//         // Guarda el producto en la base de datos
//         const savedProduct = await newProduct.save();
    
//         res.status(201).json(savedProduct);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error al crear el producto' });
//       }
// }

const createNewProduct = async (req, res) => {

    
    const imageFiles = req.files;
    


    if (!req?.body?.titulo || !req?.body?.descripcion) {
        return res.status(400).json({ 'message': 'First and last names are required' });
        
    }
    console.log(req.body)
    const {titulo, precio, precio_mayor, descripcion, codigo, tipo, sexo, tallas_zapatos, tallas, imagen, imagenes} = req.body

   
    try {

        const images = imageFiles.map((file) => file.originalname);

        const result = await Product.create({
            titulo: titulo,
            descripcion: descripcion,
            precio: precio,
            precio_mayor: precio_mayor,
            tipo: tipo,
            sexo: sexo,
            codigo: codigo,
            tallas: JSON.parse(tallas),
            tallas_zapatos: JSON.parse(tallas_zapatos),
            imagen: imagen,
            imagenes: JSON.parse(imagenes)
            
            
            
            

        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

// const updateProduct = async (req, res) => {
//     if (!req?.params?.id) {
//         return res.status(400).json({ 'message': 'ID parameter is required.' });
//     }

//     const product = await Product.findOne({ _id: req.params.id }).exec();
//     if (!product) {
//         return res.status(204).json({ "message": `No Product matches ID ${req.params.id}.` });
//     }
//     if (req.body?.titulo) product.titulo = req.body.titulo;
//     if (req.body?.descripcion) product.descripcion = req.body.descripcion;
//     if (req.body?.precio) product.precio = req.body.precio;
//     if (req.body?.precio_mayor) product.precio_mayor = req.body.precio_mayor;
//     if (req.body?.codigo) product.codigo = req.body.codigo;
//     if (req.body?.sexo) product.sexo = req.body.sexo;
//     if (req.body?.tipo) product.tipo = req.body.tipo;
//     if (req.body?.imagen) product.imagen = req.body.imagen;
//     if (req.body?.imagenes) product.imagenes = req.body.imagenes;
//     if (req.body?.tallas) product.tallas = req.body.tallas;
//     if (req.body?.tallas_zapatos) product.tallas = req.body.tallas_zapatos;
    
//     const result = await Product.findByIdAndUpdate(req.params.id, product);
//     res.json(result);
// }

// const updateProduct = async (req, res) => {
//     if (!req?.params?.id) {
//         return res.status(400).json({ 'message': 'ID parameter is required.' });
//     }

//     try {
//         const product = await Product.findOne({ _id: req.params.id });

//         if (!product) {
//             return res.status(404).json({ "message": `No Product matches ID ${req.params.id}.` });
//         }

//         // Update the product fields based on the request body
//         if (req.body?.titulo) product.titulo = req.body.titulo;
//         if (req.body?.descripcion) product.descripcion = req.body.descripcion;
//         if (req.body?.precio) product.precio = req.body.precio;
//         if (req.body?.precio_mayor) product.precio_mayor = req.body.precio_mayor;
//         if (req.body?.codigo) product.codigo = req.body.codigo;
//         if (req.body?.sexo) product.sexo = req.body.sexo;
//         if (req.body?.tipo) product.tipo = req.body.tipo;
//         if (req.body?.imagen) product.imagen = req.body.imagen;
//         if (req.body?.imagenes) product.imagenes = req.body.imagenes;
//         if (req.body?.tallas) product.tallas = req.body.tallas;
//         if (req.body?.tallas_zapatos) product.tallas = req.body.tallas_zapatos;

//         const updatedProduct = await product.save();
//         res.json(updatedProduct);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ 'message': 'Internal server error.' });
//     }
// }
async function updateProduct(req, res) {
    const { id } = req.params; // Extract the product ID from the request parameters
    const updateData = req.body; // Get the updated product data from the request body
  
    try {
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      // Update the product fields based on the updateData
      if (updateData.titulo) product.titulo = updateData.titulo;
      if (updateData.descripcion) product.descripcion = updateData.descripcion;
      if (updateData.precio) product.precio = updateData.precio;
      if (updateData.precio_mayor) product.precio_mayor = updateData.precio_mayor;
      if (updateData.tipo) product.tipo = updateData.tipo;
      if (updateData.codigo) product.codigo = updateData.codigo;
      if (updateData.sexo) product.sexo = updateData.sexo;
      if (updateData.tallas) product.tallas = updateData.tallas;
      if (updateData.tallas_zapatos) product.tallas_zapatos = updateData.tallas_zapatos;
      if (updateData.imagen) product.imagen = updateData.imagen;
      if (updateData.imagenes) product.imagenes = updateData.imagenes;
  
      // Update size/color information
      
  
      await product.save();
      res.json({ success: true, message: 'Product updated successfully', updatedProduct: product });
    } catch (error) {
      res.status(500).json({ success: false, message: 'An error occurred while updating the product', error });
    }
  }
// const updateProduct = async (req, res) => {
//     const imageFiles = req.files;

//     // if (!req?.body?.titulo || !req?.body?.descripcion) {
//     //     return res.status(400).json({ 'message': 'First and last names are required' });
//     // }

//     const { titulo, precio, precio_mayor, descripcion, codigo, tipo, sexo, tallas_zapatos, tallas, imagen, imagenes } = req.body;

//     try {
//         // const images = imageFiles.map((file) => file.originalname);

//         // Assuming you have a Product model and you're fetching the product by its ID
//         const productId = req.params.id; // Assuming you can get the product ID from the URL
//         const product = await Product.findById(productId);

//         if (!product) {
//             return res.status(404).json({ 'message': 'Product not found' });
//         }

//         // Update the product fields
//         product.titulo = titulo;
//         product.descripcion = descripcion;
//         product.precio = precio;
//         product.precio_mayor = precio_mayor;
//         product.tipo = tipo;
//         product.sexo = sexo;
//         product.codigo = codigo;
//         product.tallas = JSON.parse(tallas);
//         product.tallas_zapatos = JSON.parse(tallas_zapatos);
//         product.imagen = imagen;
//         product.imagenes = JSON.parse(imagenes);

//         // Save the updated product
//         const updatedProduct = await product.save();

//         res.status(200).json(updatedProduct);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ 'message': 'Internal server error' });
//     }
// };

// const deleteProduct = async (req, res) => {
    
//     if (!req?.body?.id) return res.status(400).json({ 'message': 'Product ID required.' });
//     console.log(req.body.id)
//     res.json(req?.body?.id)

//     const product = await Product.findOne({ _id: req?.body?.id }).exec();
//     if (!product) {
//         return res.status(204).json({ "message": `No Product matches ID ${req.body.id}.` });
//     }
//     console.log(product)
//     res.json(product)


    
//     const result = await Product.deleteOne({_id: req?.body?.id}); //{ _id: req.body.id }
//     res.json(result);
//     console.log(result)
// }

// backend/controllers/productsController.js

const deleteProduct = async (req, res) => {
    const productId = req.params.id; // Get the product ID from URL parameter

    if (!productId) {
        return res.status(400).json({ 'message': 'Product ID required.' });
    }

    // ... rest of your code ...

    try {
        const product = await Product.findOne({ _id: productId }).exec();
        if (!product) {
            return res.status(204).json({ "message": `No Product matches ID ${productId}.` });
        }

        const result = await Product.deleteOne({ _id: productId });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "message": "Server Error" });
    }
};


// const deleteProduct = async (req, res) => {
//     console.log(req?.params)
//     if (!req?.params?.id) return res.status(400).json({ 'message': 'Product ID required.' });

//     const product = await Product.findOne({ _id: req.params.id }).exec();
//     if (!product) {
//         return res.status(204).json({ "message": `No Product matches ID ${req.params.id}.` });
//     }
//     const result = await Product.findByIdAndDelete(req.params.id); //{ _id: req.body.id }
//     res.json(result);
// }

const getProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Product ID required.' });

    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No Product matches ID ${req.params.id}.` });
    }
    res.json(product);
}

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct
}