const mongoose = require("mongoose");


const countrySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    zipcode: String
})

const foodSchema = mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    image: String,
    ingredients: [String],
    country: [countrySchema]
})

mongoose.model(process.env.FOOD_MODEL, foodSchema, process.env.FOODS_COLLECTION)