const express = require("express");
const router = express.Router()

const countryController = require("../controllers/countryController")

router.route(process.env.ROUTE_FOODID_COUNTRY)
    .get(countryController.getCountryAllOneFood)
    .post(countryController.insertCountryOne)

router.route(process.env.ROUTE_FOODID_COUNTRY_COUNRTYID)
    .delete(countryController.deleteCountryOne)
    .patch(countryController.paritalUpdateCountryOne)
    .put(countryController.fullUpdateCountryOne)
    .get(countryController.getOneCountry)

   

module.exports = router;