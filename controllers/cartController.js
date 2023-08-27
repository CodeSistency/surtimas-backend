const User = require('../model/User'); // Adjust the path as needed

async function getAllCartProducts(req, res) {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cartProducts = user.cart;
        return res.json({ cartProducts });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateCart (req, res) {
    // const { username, nombre, precio, precio_mayor, quantity } = req.body;
    const { username, nombre, precio, precio_mayor, quantity, imagen, id, codigo } = req.body;
    try {
        
        
        console.log(username, nombre, precio, precio_mayor, quantity, id, codigo)
        // console.log(JSON.parse(username))

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the cart item already exists in the user's cart
        const existingCartItem = user.cart.find(item => item.product === id);

        if (existingCartItem) {
            // Update the quantity of the existing cart item
            existingCartItem.quantity += quantity;
        } else {
            // Create a new cart item and add it to the user's cart
            user.cart.push({
                nombre,
                precio,
                quantity,
                imagen,
                product: id,
                codigo: codigo
            });
        }

        await user.save();

        return res.json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteCartProduct(req, res) {
    try {
        const { username, id } = req.params;

        const user = await User.findOne({ username });

        console.log(user, id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cartItemIndex = user.cart.findIndex(item => item.product.toString() === id);
        console.log(cartItemIndex)

        if (cartItemIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        user.cart.splice(cartItemIndex, 1);
        await user.save();

        return res.json({ message: 'Cart product deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {updateCart, getAllCartProducts, deleteCartProduct}