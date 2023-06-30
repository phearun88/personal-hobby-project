const express = require("express")
const app = express();
require("./api/data/dbConnection")
require("dotenv").config()
const router = require("./api/routes/index")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(function(req,res,next){
    res.header(process.env.ACCESS_CONTROL_ALLOW_ORIGIN, process.env.BASE_URL_UI)
    res.header(process.env.ACCESS_CONTROL_ALLOW_METHODS, process.env.HTTP_METHODS)
    res.header(process.env.ACCESS_CONTROL_ALLOW_HEADERS, process.env.ORIGIN_X_REQUESTED_WITH_CONTENT_TYPE_ACCEPT);
    next();
})

app.use(process.env.ROUTE_API,router);

const server = app.listen(process.env.PORT, function (req, res) {
    const port = server.address().port;
    console.log(process.env.SMS_SERVER_RUN + port)
})




