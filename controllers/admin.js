const models = require('../models')
const bcrypt = require("bcrypt");

//Create User
const createUser = async (req, res) => {
    const {name, email, password } = req.body
  try {
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await models.User.create({
        name: name,
        email: email,
        password: hashedPassword
   })

    return res.status(201).json({
      success: true,
      message: 'The Creation of the User was succefull',
      user
    })

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

//Get all users
const usersList = async (req, res) => {
    await models.User.findAll()
     .then((user) => {
      res.json(user);
     })
     .catch((err) => {
      console.log(err);
     })
  };
  
//Get User
const singleUser =  async (req, res) => {
    const {id} = req.params;
    await models.User.findByPk(id)
    .then((user) => {
            res.json(user)
    })
    .catch((err)=> {
        console.log(err);
    })
};
  
//Update User
const updateUser =  async (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await models.User.update({
            name: name,
            email: email,
            password: hashedPassword,
        },
        { where: { id: id } }
    )
    .then((user) => {
            res.json(user);
    })
    .catch((err)=> {
            console.log(err);
    })
};

//Delete User
const deleteUser =  async (req, res) => {
    const {id} = req.params;
    await models.User.destroy({ where: { id: id } })
    .then((user) => {
            res.json(user);
    })
    .catch((err)=> {
            console.log(err);
    })
};

//Update User Role to Admin
const admin =  async (req, res) => {
  const { id } = req.params
  await models.User.update({
          role: true,
      },
      { where: { id: id } }
  )
  .then((user) => {
          res.json(user);
  })
  .catch((err)=> {
          console.log(user);
  })
};

module.exports = {
    usersList,
    singleUser,
    createUser, 
    updateUser, 
    deleteUser, 
    admin
}