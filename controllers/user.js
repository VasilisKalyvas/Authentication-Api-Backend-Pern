const models = require('../models')
const cron = require("node-cron");

//Borrow Book
const borrowBook = async (req, res) => {
  
  const book = await models.Book.findByPk(req.body.BookId);
  console.log(book.title)
  console.log(req.user.id);
  console.log(req.body.UserId);
  if(req.user.id.toString() !== req.body.UserId){
    return res.status(401).json("You dont have access in this action!");
  }
  if(!book){
    return res.status(401).json("Book doesn't exist!");
  }
  if(book.copies === 0){
    return res.status(401).json("Book is not available!");
  }
  const UserAlreadyBorrowed = await models.BorrowedBooks.findOne({
    where: {
        UserId: req.body.UserId,
        BookId: req.body.BookId
    }
  })
  if(UserAlreadyBorrowed){
    return res.status(401).json("User already has borrowed this book!");
  }
  try {
    const after1Week = new Date();
    after1Week.setDate(after1Week.getDate() + 7);
    
    const borrowedBook = await models.BorrowedBooks.create({
        UserId: req.body.UserId,
        BookId: book.id,
        title: book.title,
        description: book.description,
        published: book.published,
        writter: book.writter,
        bookImage: book.bookImage,
        copies: book.copies-1,
        publishedYear: book.publishedYear,
        expiredAt: after1Week.toUTCString()
    })
    await models.Book.update({
       copies: book.copies-1
    },
    { where: { id: book.id } }
)
    return res.status(201).json({
        borrowedBook
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({
        error: error.message,
      })
    }
};

//delete borrow
const deleteborrow =  async (req, res) => {
    const {id} = req.params;
    const borrow = await models.BorrowedBooks.findByPk(id);
    if(!borrow){
        return res.status(401).json("Borrow doesn't exist!");
    }
    await models.Book.update({
        copies: borrow.copies + 1
     },
     { where: { id: borrow.BookId } }
    )
    await models.BorrowedBooks.destroy({ where: { id: id } })
    .then((borrow) => {
            res.json(borrow);
    })
    .catch((err)=> {
            console.log(err);
    })
};

{
  /*
    const date = new Date();
    console.log('Today:', date);
    date.setDate(date.getDate() + 7);
    console.log('After 1 week:', date);
  */
}

// For now every 1 min 
// Check every 5 hours if borrow time has expired (1 week)
const checkForExpired = async () => {
    console.log('job every 1 min');
    const borrowed = await models.BorrowedBooks.findAll({raw : true})
    if(borrowed.length === 0){
      return 0;
    }
    const current = new Date();
    for(let i = 0; i<borrowed.length; i++){
      if(borrowed[i].expiredAt <= current){ // if expired date is past
        console.log('Expired', borrowed[i].title);
        await models.Book.update(
          {
            copies: borrowed[i].copies + 1
          },
          { where: { id: borrowed[i].BookId } }
        )
        await models.BorrowedBooks.destroy({ where: { id: borrowed[i].id } })
      }else{
        console.log('Not expired Yet', borrowed[i].title);
      }
    }
    
}
// ('* * * * *') every 1 min
// ('0 */5 * * *') every 5 hours
cron.schedule('* * * * *', () => {
  checkForExpired();
})

module.exports = {
    borrowBook,
    deleteborrow
}