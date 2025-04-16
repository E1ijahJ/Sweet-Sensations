// Express.js route handler
app.post('/api/cart/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    let cart = await getOrCreateCartForUser(userId);
    let item = await findCartItem(cart.id, productId);

    if (item) {
        await updateQuantity(cart.id, productId, item.quantity + quantity);
    } else {
        await addNewCartItem(cart.id, productId, quantity);
    }

    res.status(200).json({ message: "Item added to cart!" });
});
