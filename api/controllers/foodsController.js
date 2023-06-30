require("../data/foods-model")

require("dotenv").config()

const mongoose = require("mongoose")
const Food = mongoose.model(process.env.FOOD_MODEL)

const utils =  require("../utils/utils")

const _initializeRespone   = utils._initializeRespone;
const _setResponse      = utils._setResponse;
const _setInternalError = utils._setInternalError;
const _sendResponse     = utils._sendResponse;

const _checkPagination = function (req, response) {
    return new Promise((resolve, reject) => {

        let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
        let count = parseInt(process.env.DEFAULT_FIND_COUNT);

        if (req.query && req.query.offset) {
            offset = parseInt(req.query.offset, process.env.DEFAULT_COUNT);
        }
        if (req.query && req.query.count) {
            count = parseInt(req.query.count, process.env.DEFAULT_COUNT);
        }
        const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, process.env.DEFAULT_COUNT);

        if (isNaN(offset) || isNaN(count)) {
            _setResponse(process.env.HTTP_RESPONSE_NO)
            reject({ message: { message: process.env.QUERYSTRING_OFFSET_AND_COUNT_SHOULD_BE_NUMBERS }});
        } else if (count > maxCount) {
            _setResponse(process.env.HTTP_NOT_FOUND, { message: process.env.CANNOT_EXCEED_COUNT_OF + maxCount })
            reject({ message: { message: process.env.CANNOT_EXCEED_COUNT_OF}});
        } else {
            resolve({ offset: offset, count: count });
        }
    })
}



const _getAllFoods = function (pagination, keysearch) {
    const offset = pagination.offset;
    const count = pagination.count;
  
    if(keysearch == undefined){
        return Food.find().skip(offset).limit(count).sort({_id:-1}).exec();
    }else{
        if(keysearch =="null"){ keysearch = "";}
        return Food.find({ name: { $regex: keysearch, $options: 'i' } }).skip(offset).limit(count).sort({_id:-1}).exec();
    }
}

const getALlFood = function (req, res) {
    const response = _initializeRespone();

    _checkPagination(req, response)
        .then((pagiantion) => _getAllFoods(pagiantion, req.query.keysearch))
        .then((foods) => _setResponse(response, process.env.HTTP_RESPONSE_OK, foods))
        .catch((error) => _setInternalError(response, error))
        .finally(() => _sendResponse(res, response));
}

const _checkFoodExit = function (food) {
    return new Promise((resolve, reject) => {
        if (!food) {
            reject({status: process.env.HTTP_NOT_FOUND,  message: process.env.SMS_FOOD_NOT_FOUND});
        } else {
            resolve(food);
        }
    })
}


const getOneFood = function (req, res) {
    const response = _initializeRespone();
    const foodId = req.params.foodId;
    Food.findById(foodId).exec()
        .then((food) => _checkFoodExit(food))
        .then((food) => _setResponse(response, process.env.HTTP_RESPONSE_OK, food))
        .catch((error) => _setResponse(response, process.env.HTTP_NOT_FOUND, error))
        .finally(() => _sendResponse(res, response))
}

const deleteOneFood = function (req, res) {
    const response = _initializeRespone();
    const foodId = req.params.foodId;
    Food.findByIdAndDelete(foodId).exec()
        .then((food) => _checkFoodExit(food))
        .then((food) => _setResponse(response, process.env.HTTP_RESPONSE_OK, { message: process.env.SMS_FOOD_DELETED }))
        .catch((error) => _setResponse(response, process.env.HTTP_NOT_FOUND, error))
        .finally(() => _sendResponse(res, response))
}


const insertOneFood = function (req, res) {
    const response = _initializeRespone();
    _createFood(req)
        .then((food) => _setResponse(response, process.env.HTTP_RESPONSE_OK, { message: process.env.SMS_FOOD_ADD}))
        .catch((error) => _setResponse(response, process.env.HTTP_INTERNAL_SERVER_ERROR, error))
        .finally(() => _sendResponse(res, response));
}


const _createFood = function (req) {
    
    var arrIngredient = req.body.ingredients
    var newArr = arrIngredient;

    if (arrIngredient.indexOf(',') > -1) { 
        var ingredient = arrIngredient.split(",");
        newArr = ingredient;
    }
   
    const jsonFood = {
        name: req.body.name,
        image: req.body.image,
        ingredients: newArr,
        country: {
            name: req.body.country,
            zipcode: req.body.zipcode
        }
    }
    return Food.create(jsonFood);
}

const updateOne = function (req, res, updateFoodCallback) {
    const response = _initializeRespone();
    const foodId = req.params.foodId;
    Food.findById(foodId).exec()
        .then((food) => _checkFoodExit(food))
        .then((food) => updateFoodCallback(req, food))
        .then((food) => _setResponse(response, process.env.HTTP_RESPONSE_OK, { message: process.env.SMS_FOOD_UPDATED}))
        .catch((error) => _setResponse(response, process.env.HTTP_INTERNAL_SERVER_ERROR, error))
        .finally(() => _sendResponse(res, response));
}

const fullUpdate = function (req, food) {

    var arrIngredient = req.body.ingredients
    var newArr = arrIngredient;

    if (arrIngredient.indexOf(',') > -1) { 
        var ingredient = arrIngredient.split(",");
        newArr = ingredient;
    }
   
    food.name = req.body.name;
    food.image = req.body.image;
    food.ingredients = newArr;
  
    return food.save();
    
}

const fullUpdateOneFood = function (req, res) {
    updateOne(req, res, fullUpdate);
}



const partialUpdate = function (req, food) {

    var ingredient = req.body.ingredients
    var arrIngredient = ingredient.split(",");
    if (req.body.name) { food.name = req.body.name; }
    if (req.body.image) { food.image = req.body.image; }
    if (req.body.ingredients) { food.ingredients = arrIngredient; }
    return food.save();
}

const paritalUpdateOneFood = function (req, res) {
    updateOne(req, res, partialUpdate);
}

module.exports = {
    getALlFood,
    getOneFood,
    deleteOneFood,
    insertOneFood,
    paritalUpdateOneFood,
    fullUpdateOneFood
}



