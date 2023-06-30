require("../data/foods-model")
require("dotenv").config()
const mongoose = require("mongoose")
const User = mongoose.model(process.env.USER_MODEL)
const bcrypt = require("bcrypt");
const utils = require("../utils/utils")
const jwt = require("jsonwebtoken");
const util = require("util");
const _initializeRespone = utils._initializeRespone;
const _setResponse = utils._setResponse;
const _setInternalError = utils._setInternalError;
const _sendResponse = utils._sendResponse;
const _setNotFound = utils._setNotFound;
const secretKey = process.env.TOKEN_SECRET_KEY;
const _token = process.env.TOKEN;

const insertOne = function (req, res) {
    const response = _initializeRespone();
    if (req.body) {
        bcrypt.genSalt(parseInt(process.env.SALT_NUMBER)) 
            .then((salt) => generateHash(req.body.password, salt))
            .then((passwordHash) => fillNewUser(req, passwordHash))
            .then((createUser) => _setResponse(response, process.env.HTTP_RESPONSE_OK, { message: process.env.SMS_USER_ADD }))
            .catch((error) => _setInternalError(response, error))
            .finally(() => _sendResponse(res, response));
    }
}

const generateHash = function (password, salt) {
    return bcrypt.hash(password, salt);
}

const fillNewUser = function (req, passwordHash) {
    const newUser = {
        name: req.body.name,
        username: req.body.username,
        password: passwordHash
    }
    return User.create(newUser);
}

const checkUserExists = function (response, user) {
    return new Promise((resolve, reject) => {
        if (!user) {
            _setNotFound(user);
            reject();
        } else {
            response.user = user;
            resolve(user);
        }
    });
}

const checkPassword = function (password, user) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password)
        .then((isMatch)=> resolve({isMatch, user}))
        .catch((error) => reject(error));
    })
}

const checkPasswordMatch = function (isPasswordMatch, user) {
    return new Promise((resolve, reject) => {
        if (isPasswordMatch) {
            resolve(user);
        } else {
            reject(process.env.SMS_PASSWORD_INCORRECT);
        }
    });
}

const generateToken = function (user) {
    const sign = util.promisify(jwt.sign);
    return sign({ name: user.name }, secretKey, { expiresIn: process.env.TOKEN_EXPIRES_1H });
}

const setTokenResponse = function (token, response) {
    response.status = parseInt(process.env.HTTP_RESPONSE_OK);
    response.message = { _token : token };
}

const getOne = function (req, res) {
    const response = _initializeRespone();
    const getUsername = req.body.username;
    const getPassword = req.body.password;
    if (req.body && getUsername && getPassword) {

        User.findOne({ username: getUsername })
            .then((user) => checkUserExists(response, user))
            .then((user) => checkPassword(getPassword, user))
            .then(({ isMatch, user }) => checkPasswordMatch(isMatch, user))
            .then((user) => generateToken(user))
            .then((token) => setTokenResponse(token, response))
            .catch((error) => _setInternalError(response, error))
            .finally(() => _sendResponse(res, response));
    }
}

module.exports = {
    insertOne,
    getOne
}