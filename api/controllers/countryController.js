require("../controllers/foodsController")
require("dotenv").config()
const utils =  require("../utils/utils")
const mongoose = require("mongoose");
const Food = mongoose.model(process.env.FOOD_MODEL)

const _initializeRespone   = utils._initializeRespone;
const _setResponse      = utils._setResponse;
const _setInternalError = utils._setInternalError;
const _sendResponse     = utils._sendResponse;
const _field_country = process.env.FIELD_COUNTRY;
// const _field_countryId = process.env.FIELD_COUNTRY_ID;
// const _field_countryName = process.env.FIELD_COUNTRY_NAME;
// const _field_countryZipcode = process.env.FIELD_COUNTRY_ZIPCODE;

const _checkFoodExit = function (food) {
    return new Promise((resolve, reject) => {
        if (!food) {
            reject({status: process.env.HTTP_NOT_FOUND,  message: process.env.SMS_FOOD_NOT_FOUND });
        } else {
            resolve(food);
        }
    })
}

const _checkCountryExit = function (country) {
    return new Promise((resolve, reject) => {
        if (!country) {
            reject({status: process.env.HTTP_NOT_FOUND,  message: process.env.SMS_COUNTRY_NOT_FOUND });
        } else {
            resolve(country);
        }
    })
}

const getCountryAllOneFood = function (req, res) {
    const response = _initializeRespone();
    const foodId = req.params.foodId;
    Food.findById(foodId).select(process.env.FIELD_COUNTRY).exec()
        .then((food) => _checkFoodExit(food))
        .then((food) => _setResponse(response, process.env.HTTP_RESPONSE_OK, food.country))
        .catch((error) => _setInternalError(response, process.env.HTTP_INTERNAL_SERVER_ERROR, error))
        .finally(() => _sendResponse(res, response))
}

const getOneCountry = function (req, res) {
    const response = _initializeRespone();
    const foodId = req.params.foodId;
    const countryId = req.params.countryId;

    Food.findById(foodId).exec()
        .then((food) => _checkFoodExit(food))
        .then((food) => _setResponse(response, process.env.HTTP_RESPONSE_OK, food.country.id(countryId)))
        .catch((error) => _setResponse(response, process.env.HTTP_NOT_FOUND, error))
        .finally(() => _sendResponse(res, response))
}

const insertCountryOne = function (req, res) {

    const response = _initializeRespone();
    const foodId = req.params.foodId;
    const subDocumentCountry = {
        name: req.body.name,
        zipcode: req.body.zipcode
    }

    Food.updateOne({ _id: foodId }, { $push: { "country": subDocumentCountry } }).exec()
        .then((food) => _checkFoodExit(food))
        .then((food) => _setResponse(response, process.env.HTTP_RESPONSE_OK, food.country))
        .catch((error) => _setInternalError(response, process.env.HTTP_INTERNAL_SERVER_ERROR, error))
        .finally(() => _sendResponse(res, response))
}


const deleteCountryOne = function (req, res) {

    
    const response = _initializeRespone();
    const foodId = req.params.foodId;
    const countryId = req.params.countryId;
    console.log(countryId);
    
    Food.updateOne({ _id: foodId }, { $pull: { "country": { _id: countryId } }}).exec()
        .then((food) => _checkFoodExit(food))
        .then((food) => _setResponse(response, process.env.HTTP_RESPONSE_OK, {message: process.env.SMS_COUNTRY_DELETED}))
        .catch((error) => _setInternalError(response, process.env.HTTP_INTERNAL_SERVER_ERROR, error))
        .finally(() => _sendResponse(res, response))
}



const fullUpdateCountryOne = function (req, res) {
    const response = _initializeRespone();
    const foodId = req.params.foodId;
    const countryId = req.params.countryId;
    const name= req.body.name;
    const zipcode= req.body.zipcode

    Food.updateOne({ _id: foodId, "country._id" : countryId}, {$set: {"country.$.name": name,"country.$.zipcode": zipcode}}).exec()
        .then((food) => _checkFoodExit(food))
        .then((country) => _checkCountryExit(country))
        .then((food) => _setResponse(response, process.env.HTTP_RESPONSE_OK, { message:  process.env.SMS_COUNTRY_UPDATED }))
        .catch((error) => _setResponse(response, process.env.HTTP_INTERNAL_SERVER_ERROR, error))
        .finally(() => _sendResponse(res, response));
}

const paritalUpdateCountryOne = function (req, res) {
    const response = _initializeRespone();
    const foodId = req.params.foodId;
    const countryId = req.params.countryId;

    if (req.body.name){const name= req.body.name;}
    if (req.body.zipcode){const zipcode= req.body.zipcode;}
    
    Food.updateOne({ _id: foodId, "country._id": countryId}, {$set: {"country.$.name": name,"country.$.zipcode": zipcode}}).exec()
        .then((food) => _checkFoodExit(food))
        .then((country) => _checkCountryExit(country))
        .then((food) => _setResponse(response, process.env.HTTP_RESPONSE_OK, { message: process.env.SMS_COUNTRY_UPDATED}))
        .catch((error) => _setResponse(response, process.env.HTTP_INTERNAL_SERVER_ERROR, error))
        .finally(() => _sendResponse(res, response));
}



module.exports = {
    getCountryAllOneFood,
    insertCountryOne,
    deleteCountryOne,
    getOneCountry,
    paritalUpdateCountryOne,
    fullUpdateCountryOne

}

