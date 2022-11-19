const models = require('../models')


//Get all movies
const getAllMovies = async (req, res) => {
  await models.Movie.findAll()
   .then((movies) => {
    res.json(movies);
   })
   .catch((err) => {
    console.log(err);
   })
};

//Get movie
const getMovie =  async (req, res) => {
    const {id} = req.params;
    await models.Movie.findByPk(id)
    .then((movie) => {
            res.json(movie)
    })
    .catch((err)=> {
        console.log(err);
    })
};

//Create Movie
const createMovie =  async (req, res) => {
   const {title, description, image} = req.body;
   await models.Movie.create({
        title: title,
        description: description,
        image: image
   })
   .then((movie) => {
        res.send(movie)
   })
   .catch((err)=> {
        console.log(err);
   })
};

//Update movie
const updateMovie =  async (req, res) => {
    const { id } = req.params
    const {title, description, image} = req.body;
    await models.Movie.update({
            title: title,
            description: description,
            image: image,
        },
        { where: { id: id } }
    )
    .then((movie) => {
            res.json(movie);
    })
    .catch((err)=> {
            console.log(err);
    })
};

//Delete Movie
const deleteMovie =  async (req, res) => {
    const {id} = req.params;
    await models.Movie.destroy({ where: { id: id } })
    .then((movies) => {
            res.json(movies);
    })
    .catch((err)=> {
            console.log(err);
    })
};

module.exports = {
    getAllMovies, 
    getMovie,
    createMovie,
    updateMovie, 
    deleteMovie,
}