const models = require('../models')
const bcrypt = require("bcrypt");
const jwtGenerator = require("../middleware/jwtGenerator");


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await models.User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      return res.status(401).json("Invalid Credential");
    }
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Password");
    }
    const jwtToken = jwtGenerator(user.id, user.role);
    return res.json({ jwtToken, user });

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

const signup = async (req, res) => {
    const {name, email, password } = req.body
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await models.User.create({
        name: name,
        email: email,
        password: hashedPassword
   })
   const jwtToken = jwtGenerator(user.id, user.role);
    return res.status(201).json({
      success: true,
      message: 'The registraion was succefull',
      jwtToken,
      user
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

module.exports = {
    login,
    signup
}