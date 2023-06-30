const express = require("express");
const  router = express.Router()

const usersController = require("../controllers/usersController")

router.route(process.env.ROUTE_REGISTER)
    .post(usersController.insertOne);

router.route(process.env.ROUTE_LOGIN)
    .post(usersController.getOne);

module.exports = router;

