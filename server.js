const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const indexRouter = require("./routers/indexRouter");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const bodyParser = require("body-parser");

dotenv.config({
    path: "./config/env/config.env"
})

const app = express();

const PORT = process.env.PORT;

//app.use(express.json());
app.use(bodyParser.json({limit: "200mb"}))

app.use(bodyParser.urlencoded({limit:"200mb",extended:true,parameterLimit:1000000}))

app.use(express.static("public"));

app.use(cors());

connectDatabase();

app.use("/api",indexRouter);

app.use(customErrorHandler);

app.listen(PORT,() => {
    console.log(`Application running at port: ${PORT} --- ${process.env.NODE_ENV}`);
})