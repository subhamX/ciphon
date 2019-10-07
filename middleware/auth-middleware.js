let jwt = require('jsonwebtoken');
require('dotenv').config

function authMiddleware(req, res, next){
    let token = req.headers['auth-token'];
    console.log("tok", token);
    if(token){
        jwt.verify(token, process.env.CLIENT_SECRET, (err, decoded) => {
            console.log(err);
            if(err){
                return res.json({
                    success: false,
                    message: 'Invalid Token'
                });
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        return res.json({
            sucess: false,
            message: 'No Auth Token'
        });
    }
}

module.exports = authMiddleware;