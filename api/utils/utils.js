const _initializeRespone = function (code, message) {
    const response = { status: code, message: message }
    return response;
}

const _setResponse = function (response, status, message) {
    response.status = status;
    response.message = message;
}
const _setInternalError = function (response, error) {
    response.status = parseInt(process.env.HTTP_INTERNAL_SERVER_ERROR);
    response.message = error;
}
const _sendResponse = function (res, response) {
    res.status(parseInt(response.status)).json(response.message);
}

const _setNotFound = function (response) {
    response.status = parseInt(process.env.HTTP_NOT_FOUND);
    response.message = process.env.SMS_NOT_FOUND;
}


module.exports = {
    _initializeRespone,
    _setResponse,
    _setInternalError,
    _sendResponse,
    _setNotFound
}