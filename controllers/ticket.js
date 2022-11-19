const models = require('../models')


//Get all Tickets
const getAllTickets = async (req, res) => {
  await models.Tickets.findAll(
    { 
      attributes: { exclude:['HallId', 'MovieId', 'ProjectionId', 'RowId', 'SeatId', 'UserId'] },
      include: [
          {
            model: models.User
          },
          {
            model: models.Movie
          },
          {
              model: models.Projection,
              attributes: { exclude:['HallId', 'MovieId'] },
              include:[ 
                  {
                    model: models.Halls,
                    include:[ 
                      {
                        model: models.Rows,
                        attributes: { exclude:['HallId'] },
                        include:[ 
                          {
                            model: models.Seats,
                            attributes: { exclude:['HallId', 'SeatId'] },
                            where: {isEmpty: false}
                          }
                       ]
                      }
                   ]
                  }
               ]
          }
        ]
     })
   .then((ticket) => {
    res.json(ticket);
   })
   .catch((err) => {
    console.log(err);
   })
};

//Get Ticket
const getTicket =  async (req, res) => {
    const {id} = req.params;
    await models.Tickets.findByPk(id, 
      { 
        attributes: { exclude:['HallId', 'MovieId', 'ProjectionId', 'RowId', 'SeatId', 'UserId'] },
        include: [
            {
              model: models.User
            },
            {
              model: models.Movie
            },
            {
                model: models.Projection,
                attributes: { exclude:['HallId', 'MovieId'] },
                include:[ 
                    {
                      model: models.Halls,
                      include:[ 
                        {
                          model: models.Rows,
                          attributes: { exclude:['HallId'] },
                          include:[ 
                            {
                              model: models.Seats,
                              attributes: { exclude:['HallId', 'SeatId'] },
                              where: {isEmpty: false}
                            }
                         ]
                        }
                     ]
                    }
                 ]
            }
          ]
       })
    .then((ticket) => {
            res.json(ticket)
    })
    .catch((err)=> {
        console.log(err);
    })
};

//Create Ticket
const createTicket =  async (req, res) => {
   const { UserId, ProjectionId, HallId, RowId, SeatId, MovieId } = req.body;

   try {

    //Check If All Seats Are Taken
    const AllSeats = await models.Seats.findAll({where : { HallId: HallId}})
    let countSeats = 0
    for(let i=0; i< AllSeats.length; i++){
      if(AllSeats[i].isEmpty === false){
        countSeats + 1;
      }
    }
    if(countSeats === AllSeats.length){
      return res.status(401).json("All Seats Are Taken!");
    }

    //Check If Seat is Taken
    const isEmpty = await models.Seats.findByPk(SeatId)
    console.log(isEmpty);
    if(isEmpty === null || isEmpty.isEmpty === false){
      return res.status(401).json("Seat is Taken!");
    }

    //Check If Seat Exists
    const ifExists = await models.Seats.findOne({where: { RowId: RowId, id: SeatId}})
    if(!ifExists){
      return res.status(401).json("Seat doesnt Exists!");
    }

    //Check If All Seats in this Row Are Taken
    let seats = await models.Seats.findAll({where : { RowId: RowId, isEmpty: false}})
    if(seats.length === 6){
      return res.status(401).json("All Seats In This Row Are Taken!");
    }

    await models.Tickets.create({
        UserId: UserId,
        ProjectionId: ProjectionId,
        HallId: HallId,
        RowId: RowId,
        SeatId: SeatId,
        MovieId: MovieId
    })
    .then(async (ticket) => {
      //Update Seat that is taken
      await models.Seats.update({
        isEmpty: false
        },
        { where: { id: SeatId } }
      )
      console.log(seats.length);
      //Update Row is Full
      if(seats.length === 5){
        await models.Rows.update({
          isFull: true
        },
        { where: { id: RowId} }
        )
      }
      return res.status(201).json({ticket});
    })
    
    
  } catch (error) {
    console.log(error);
  }  
};

module.exports = {
    getAllTickets, 
    getTicket, 
    createTicket
}