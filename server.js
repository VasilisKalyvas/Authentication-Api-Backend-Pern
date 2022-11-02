const express = require("express");
const db = require("./models");
const cors = require("cors");
const booksRoutes = require("./routes/books.js");
const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = 5000;

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES
app.use('/api/books', booksRoutes);
app.use('/api/auth', authRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on Port: ${PORT}`)
    })
})
