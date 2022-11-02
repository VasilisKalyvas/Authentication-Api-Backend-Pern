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

//Sort Books in Asc order by published Year
const sortASCBooksByPublisedYear =  async (req, res) => {
    await models.Book.findAll({
        order: [
            ['publishedYear', 'ASC'],
        ],
    })
    .then((books) => {
            res.json(books)
    })
    .catch((err)=> {
        console.log(err);
    })
};

//Sort Books in Desc order by published Year
const sortDESCBooksByPublisedYear =  async (req, res) => {
    await models.Book.findAll({
        order: [
            ['publishedYear', 'DESC'],
        ],
    })
    .then((books) => {
            res.json(books)
    })
    .catch((err)=> {
        console.log(err);
    })
};
//Create book
const createbook =  async (req, res) => {
   const {title, description, writter, published, bookImage, copies, publishedYear} = req.body;
   await models.Book.create({
        title: title,
        description: description,
        published: published,
        writter: writter,
        bookImage: bookImage,
        copies: copies,
        publishedYear: publishedYear
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
    const {title, description, writter, bookImage, published, copies, publishedYear} = req.body;
    await models.Book.update({
            title: title,
            description: description,
            published: published,
            writter: writter,
            bookImage: bookImage,
            copies: copies,
            publishedYear: publishedYear,
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
    deletebook,
    sortASCBooksByPublisedYear,
    sortDESCBooksByPublisedYear
}