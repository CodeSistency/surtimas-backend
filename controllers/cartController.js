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
    const { username, nombre, precio, precio_mayor, quantity, imagen, id, codigo, tallas, tallas_zapatos } = req.body;
    try {
        
        
        console.log(username, nombre, precio, precio_mayor, quantity, id, codigo, tallas, tallas_zapatos)
        // console.log(JSON.parse(username))

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user.cart)
        // Check if the cart item already exists in the user's cart
        const existingCartItem = user.cart.cartProducts.find(item => item.product === id);

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
                codigo: codigo,
                tallas,
                tallas_zapatos
            });
        }

        await user.save();

        return res.json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateCartList(req, res) {
    const { username, cart } = req.body; // Assuming you pass the entire cart in the request

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Iterate through the new cart and update items in the user's cart
        for (const newItem of cart) {
            console.log(newItem.product)
            console.log(user)
            const existingCartItem = user.cart.find(item => item.product.toString() === newItem.product);
            console.log(existingCartItem)

            if (existingCartItem) {
                console.log("existe")
                
                existingCartItem.tallas = newItem.tallas;



            }
        }

        await user.save();

        return res.json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateWholeCart(req, res) {
    const { username, cart } = req.body; // Assuming you pass the entire cart in the request

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Replace the user's cart with the new cart data
        user.cart = cart;

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


module.exports = {updateCart, updateWholeCart, getAllCartProducts, deleteCartProduct, updateCartList}