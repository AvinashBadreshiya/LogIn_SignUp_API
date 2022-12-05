require("dotenv").config();
const express = require('express')
const app = express()
// const port = process.env.PORT
// const db = require('./mongoose/mongoose')
const mongoose = require("mongoose");
const { createServer } = require("http");
const httpServer = createServer(app);
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes)

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    .then(async () => {
        const port = process.env.PORT || 3000;
        httpServer.listen(port);

        console.log(`Server serve with port number: ${port} ...`);
        console.log("mongoDB connected.....");
    })
    .catch((err) => {
        console.log(err);
    });