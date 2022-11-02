const models = require('../models')


//Get all books
const getAllbooks = async (req, res) => {
  await models.Book.findAll()
   .then((books) => {
    res.json(books);
   })
   .catch((err) => {
    console.log(err);
   })
};
//get by writter
const getBooksByWritter =  async(req, res) => {
    const {writter} = req.body
    await models.Book.findAll(
        { where: { writter: writter } }
    )
    .then((book) => {
            res.json(book);
    })
    .catch((err)=> {
            console.log(writter);
            console.log(err);
    })
}

//Get book
const getbook =  async (req, res) => {
    const {id} = req.params;
    await models.Book.findByPk(id)
    .then((book) => {
            res.json(book)
    })
    .catch((err)=> {
        console.log(err);
    })
};




//Create book
const createbook =  async (req, res) => {
   const {title, description, writter, published, bookImage, copies} = req.body;
   await models.Book.create({
        title: title,
        description: description,
        published: published,
        writter: writter,
        bookImage: bookImage,
        copies: copies
   })
   .then((books) => {
        res.send(books)
   })
   .catch((err)=> {
        console.log(err);
   })
};

//Update book
const updatebook =  async (req, res) => {
    const { id } = req.params
    const {title, description, writter, bookImage, published, copies} = req.body;
    await models.Book.update({
            title: title,
            description: description,
            published: published,
            writter: writter,
            bookImage: bookImage,
            copies: copies
        },
        { where: { id: id } }
    )
    .then((book) => {
            res.json(book);
    })
    .catch((err)=> {
            console.log(err);
    })
};

//Delete book
const deletebook =  async (req, res) => {
    const {id} = req.params;
    await models.Book.destroy({ where: { id: id } })
    .then((books) => {
            res.json(books);
    })
    .catch((err)=> {
            console.log(err);
    })
};

module.exports = {
    getAllbooks,
    getbook,
    getBooksByWritter,
    createbook,
    updatebook,
    deletebook
}