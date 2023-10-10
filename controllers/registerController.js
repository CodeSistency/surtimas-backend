const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {nombre, apellido, email, user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    // const duplicate2 = await User.findOne({ email: email }).exec();
    // if (duplicate2) return res.sendStatus(409);

    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "username": user,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };