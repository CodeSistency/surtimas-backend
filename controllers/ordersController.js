const Product = require('../model/Products');
const User = require('../model/User');
const Order = require('../model/Order');

const createNewOrder = async () => {
    try {
        // Assuming you are passing the user ID in the request body
        const { userId, orderData } = req.body;
    
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Process each item in the orderData and create an array of order items
        const orderItems = [];
        for (const orderedProduct of orderData) {
          const { codigo, items } = orderedProduct;
          const product = await Product.findOne({ codigo });
          if (!product) {
            return res.status(404).json({ message: `Product with code '${codigo}' not found` });
          }
    
          for (const item of items) {
            const { color, size, quantity } = item;
            orderItems.push({
              product: product._id,
              color,
              size,
              quantity,
            });
          }
        }
    
        // Calculate the total price based on the order items and products' prices
        let totalPrice = 0;
        for (const orderItem of orderItems) {
          const product = await Product.findById(orderItem.product);
          if (product) {
            totalPrice += product.precio * orderItem.quantity;
          }
        }
    
        // Create the order document
        const order = new Order({
          user: userId,
          items: orderItems,
          totalPrice,
        });
    
        // Save the order to the database
        await order.save();
    
        return res.status(201).json({ message: 'Order created successfully', order });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while creating the order' });
      }
}

const getAllOrders = async () => {
    try {
        const orders = await Order.find().populate('user', 'username').exec();
        return res.json(orders);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching orders' });
      }
}

const getOrder = async () => {
    const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId).populate('user', 'username').exec();
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching the order' });
  }
}

const updateOrder = async () => {
    const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order items, totalPrice, or other fields as needed from the request body
    // Example: order.items = req.body.items;
    //         order.totalPrice = req.body.totalPrice;

    await order.save();
    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the order' });
  }
}

const deleteOrder = async () => {
    const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.remove();
    return res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while deleting the order' });
  }
}

module.exports = {getAllOrders, getOrder, updateOrder, deleteOrder}