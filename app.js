const express = require("express");

// express app
const app = express();

// cors
require("cors")();

// dotenv
require("dotenv").config();

// global middlewares
app.use(express.json()); 

// routers
const loginRouter = require("./routes/login");

app.use("/login", loginRouter);



// port
const port = process.env.PORT || 5077;

// connect to db & listen to port
const connect_db = require("./db/connect");

const start = async () => {
    try{
        await connect_db(process.env.MONGO_URI);
        console.log("connected to db...");
        app.listen(port, console.log(`listening on port ${port}...`));
    }catch(error)
    {
        console.log(error);
    }
};

start();