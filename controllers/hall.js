const models = require('../models')


//Get all Halls
const getAllHalls = async (req, res) => {
  await models.Halls.findAll(
    { 
        include: [
            {
                model: models.Rows,
                include:[models.Seats]
            }
        ]
    })
   .then((halls) => {
    res.json(halls);
   })
   .catch((err) => {
    console.log(err);
   })
};

//Get Hall
const getHall =  async (req, res) => {
    const {id} = req.params;
    await models.Halls.findByPk(id, { 
        include: [
            {
                model: models.Rows,
                include:[models.Seats]
            }
        ]
    })
    .then((hall) => {
            res.json(hall)
    })
    .catch((err)=> {
        console.log(err);
    })
};

//Create Hall
const createHall =  async (req, res) => {
   const { name } = req.body;
    await models.Halls.create({
            name: name
    })
    .then( async (hall)  => {
        let array = ['A', 'B', 'C', 'D', 'E', 'F']
        for(let i=0; i<6; i++){
            await models.Rows.create({
                HallId: hall.id,
                name: array[i],
            }).then( async(row) => {
                for(let i=0; i<6; i++){
                    await models.Seats.create({
                        RowId: row.id,
                        HallId: hall.id,
                        name: `${row.name}${i+1}`,
                    })
                }
            })
        }
         await models.Halls.findByPk(hall.id,{ 
                include: [
                    {
                        model: models.Rows,
                        include:[models.Seats]
                    }
                ]
            }
        ).then((hall) => {
            res.send(hall)
        })
   })
   .catch((err)=> {
        console.log(err);
   })
};

module.exports = {
    getAllHalls, 
    getHall, 
    createHall
}