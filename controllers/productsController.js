const Product = require('../model/Products');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



const getAllProducts = async (req, res) => {
    const product = await Product.find();
    if (!product) return res.status(204).json({ 'message': 'No Product found.' });
    res.json(product);
}

const searchProducts = async (req, res) => {
  const searchTerm = req.query.query;

  try {
    const products = await Product.find({ $titulo: { $search: searchTerm } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for products.' });
  }

}

// const searchProducts = async (req, res) => {
//   const searchQuery = req.query.search || '';

//   try {
//     // Create a regex pattern to perform case-insensitive search
//     const searchPattern = new RegExp(searchQuery, 'i');

//     const query = {};

//     // Add search condition
//     query.$or = [
//       { name: { $regex: searchPattern } }, // Match products by name
//       { code: { $regex: searchPattern } }, // Match products by code
//     ];

//     const products = await Product.find(query);

//     if (products.length === 0) {
//       return res.status(204).json({ message: 'No products found.' });
//     }

//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const getQRProducts = async (req, res) => {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = 30;
  
    try {
      const skip = (pageNumber - 1) * pageSize;
  
      const products = await Product.find()
        .skip(skip)
        .limit(pageSize)
        .exec();
  
      if (products.length === 0) {
        return res.status(204).json({ message: 'No products found.' });
      }
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getSomeProducts = async (req, res) => {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = 40;
    const searchQuery = req.query.search || '';
  
    try {
      const skip = (pageNumber - 1) * pageSize;

      // Create a regex pattern to perform case-insensitive search
      const searchPattern = new RegExp(searchQuery, 'i');
  
      const products = await Product.aggregate([
        {
            $match: {
              $or: [
                { name: { $regex: searchPattern } }, // Match products by name
                { codigo: { $regex: searchPattern } }, // Match products by code
              ],
            },
          },
        { $sample: { size: pageSize } }, // Randomly sample 'pageSize' number of products
        { $skip: skip }, // Apply pagination
        { $limit: pageSize }, // Limit the number of products per page
      ]);
  
      if (products.length === 0) {
        return res.status(204).json({ message: 'No products found.' });
      }
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


//   const getLimitedProducts = async (req, res) => {
//     const pageNumber = parseInt(req.query.pageNumber) || 1;
//     const pageSize = 15;
  
//     try {
//       const skip = (pageNumber - 1) * pageSize;
  
//       const products = await Product.aggregate([
//         { $sample: { size: pageSize } }, // Randomly sample 'pageSize' number of products
//         { $skip: skip }, // Apply pagination
//         { $limit: pageSize }, // Limit the number of products per page
//       ]);
  
//       if (products.length === 0) {
//         return res.status(204).json({ message: 'No products found.' });
//       }
  
//       res.json(products);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

const getLimitedProducts = async (req, res) => {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = 15;
    const searchQuery = req.query.search || '';
  
    try {
      const skip = (pageNumber - 1) * pageSize;
  
      // Create a regex pattern to perform case-insensitive search
    //   const searchPattern = new RegExp(searchQuery, 'i');
  
      const products = await Product.aggregate([
        // {
        //   $match: {
        //     $or: [
        //       { name: { $regex: searchPattern } }, // Match products by name
        //       { codigo: { $regex: searchPattern } }, // Match products by code
        //     ],
        //   },
        // },
        { $sample: { size: pageSize } }, // Randomly sample 'pageSize' number of products
        { $skip: skip }, // Apply pagination
        { $limit: pageSize }, // Limit the number of products per page
      ]);
  
      if (products.length === 0) {
        return res.status(204).json({ message: 'No products found.' });
      }
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const getAllRandomProducts = async (req, res) => {
    try {
      const products = await Product.aggregate([{ $sample: { size: 40 } }]); // Randomly sample 15 products
  
      if (products.length === 0) {
        return res.status(204).json({ message: 'No products found.' });
      }
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getProductsByGender = async (req, res) => {
    const gender = req.params.gender; // 'men', 'women', etc. passed as a URL parameter
    const products = await Product.find({ sexo: gender });
    res.json(products);
}

const getProductsByType = async (req, res) => {
    const type = req.params.type; // 'shoes', 'toys', etc. passed as a URL parameter
    const products = await Product.find({ tipo: type });
    res.json(products);
}


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



const getProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Product ID required.' });

    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No Product matches ID ${req.params.id}.` });
    }
    res.json(product);
}

async function updateComentario (req, res) {
    // const { username, nombre, precio, precio_mayor, quantity } = req.body;
    const { username, comentario, id } = req.body;
    try {
        
        
        console.log(username, comentario, id)
        // console.log(JSON.parse(username))

        const product = await Product.findOne({ _id: id });

        if (!product) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the cart item already exists in the user's cart
      

  
            product.comentarios.push({
                usuario: username,
                comentario
                
            });
        

        await product.save();

        return res.json({ message: 'Comentario updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllComentarios = async (req, res) => {
    const product = await Product.find();
    if (!product) return res.status(204).json({ 'message': 'No Comment found.' });
    res.json(product.comentarios);
}

module.exports = {
    getAllProducts,
    getProductsByGender,
    getProductsByType,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getLimitedProducts,
    getAllRandomProducts,
    getSomeProducts,
    updateComentario,
    getAllComentarios,
    searchProducts,
    getQRProducts
}