const express = require("express");
const  router = express.Router()
const foodsController = require("../controllers/foodsController")



router.route(process.env.ROUTE_HOME)
    .get(foodsController.getALlFood)
    .post(foodsController.insertOneFood)

router.route(process.env.ROUTE_FOODID)
    .get(foodsController.getOneFood)
    .delete(foodsController.deleteOneFood)
    .patch(foodsController.paritalUpdateOneFood)
    .put(foodsController.fullUpdateOneFood)



module.exports = router;


