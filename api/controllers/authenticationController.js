const util = require("util");
const jwt = require("jsonwebtoken");
const authenticate = function (req, res, next) {
    const respone = {
        status: process.env.HTTP_RESPONSE_NO_TOKEN,
        message: process.env.SMS_TOKEN_NOT_PROVIDE
    };
    const headerExists = req.headers.authorization;
    if (headerExists) {
        const token = req.headers.authorization.split(" ")[1];
        const verify = util.promisify(jwt.verify);
        verify(token, process.env.TOKEN_CS572)
            .then(() => next())
            .catch(() => res.status(respone.status).json(respone.message))
    } else {
        res.status(process.env.HTTP_RESPONSE_UNAUTHORIZED).json(process.env.SMS_UNAUTHORIZED);
    }
}

module.export = authenticate

