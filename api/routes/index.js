const express = require("express");
const  router = express.Router()

const foodRoute = require("./food")
const countryRoute = require("./country")
const userRoute = require("./user")

router.use(process.env.ROUTE_FOODS,foodRoute)
router.use(process.env.ROUTE_FOODS,countryRoute)
router.use(process.env.ROUTE_USERS,userRoute)

module.exports  = router