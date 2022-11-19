const models = require('../models')


//Get all Projections
const getAllProjections = async (req, res) => {
  await models.Projection.findAll(
    { 
        include: [
            {
                model: models.Movie
            },
            {
                model: models.Halls,
                include:[ 
                    {
                      model: models.Rows,
                      include:[ 
                        {
                          model: models.Seats,
                          
                        }
                     ]
                    }
                 ]
            }
        ]
    })
   .then((projections) => {
    res.json(projections);
   })
   .catch((err) => {
    console.log(err);
   })
};

//Get Projection
const getProjection =  async (req, res) => {
    const {id} = req.params;
    await models.Projection.findByPk(id, { 
        include: [
            {
                model: models.Movie
            },
            {
                model: models.Halls,
                include:[ 
                    {
                      model: models.Rows,
                      include:[ 
                        {
                          model: models.Seats,
                          
                        }
                     ]
                    }
                 ]
            }
        ]
    })
    .then((projection) => {
            res.json(projection)
    })
    .catch((err)=> {
        console.log(err);
    })
};

//Create Projection
const createProjection =  async (req, res) => {
   const { TimeAndDate, HallId, MovieId } = req.body;
    await models.Projection.create({
        TimeAndDate: TimeAndDate,
        HallId: HallId,
        MovieId: MovieId
    })
    .then((projection) => {
            res.send(projection)
    })
   .catch((err)=> {
        console.log(err);
   })
};

module.exports = {
    getAllProjections, 
    getProjection, 
    createProjection
}