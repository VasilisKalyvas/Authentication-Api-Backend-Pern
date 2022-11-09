eLibrary

Stack: Postgres (ORM: Sequelize), Node js, Express js , React js, State Managemente: Redux.

Features:

1. User Auth (SignUp/Login/Logout).
2. Admin Role.
3. Get All Books (User Role).
4. Get Single Book (User Role).
5. Get Books By Writter (User Role).
6. Get Books By DESC ORDER (User Role).
7. Get Books By ASC ORDER (User Role).
8. Create Book (Admin Role).
8. Update Book (Admin Role).
8. Delete Book (Admin Role).

Tables with Associations

User - Books - BorrowBooks
1. BelongTo
2. hasMany

Borrow Book:

1. User can Borrow Book.
2. User can Borrow Book if copies are > 0.
3. User cant Borrow the same Book.
4. if User returns the Book then copies of the Βook will increse by 1.
5. User cant Βorrow Book for other Users.
6. Check if Book exists.