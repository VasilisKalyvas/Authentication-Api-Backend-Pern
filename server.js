const express = require("express");
const db = require("./models");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const moviesRoutes = require("./routes/movies.js");
const hallRoutes = require("./routes/hall.js");
const projectionRoutes = require("./routes/projection.js");
const ticketRoutes = require("./routes/ticket.js");
const adminRoutes = require("./routes/admin.js");

const app = express();
const PORT = 5000;

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/hall', hallRoutes);
app.use('/api/projection', projectionRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/admin', adminRoutes);

//DB CONNECTION
db.sequelize.sync().then(() => {
    //SERVER
    app.listen(PORT, () => {
        console.log(`Server is running on Port: ${PORT}`)
    })
})
