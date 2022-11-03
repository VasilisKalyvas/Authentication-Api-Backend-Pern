const models = require('../models')


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
    const borrowedBook = await models.BorrowedBooks.create({
        UserId: req.body.UserId,
        BookId: book.id,
        title: book.title,
        description: book.description,
        published: book.published,
        writter: book.writter,
        bookImage: book.bookImage,
        copies: book.copies-1,
        publishedYear: book.publishedYear
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

module.exports = {
    borrowBook,
    deleteborrow
}