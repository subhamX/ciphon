const app = require('express').Router();
const User = require('../schema/authSchema')
const jwt = require('jsonwebtoken');


// SignUp Route
app.post('/signup/', async (req, res) => {
    let uName = req.body.username;
    let passwd = req.body.password;
    let email = req.body.email;
    try{
        let userInstance = new User({
            username: uName,
            password: passwd,
            email: email,
        });
        var response = await userInstance.save();
        res.send(response);
    }catch(err){
        res.send(err);
    }
})

// SignIn Route
app.post('/signin/', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let query = User.find({
        username: username,
    });
    try{
        var docs = await query.exec();
    }catch(err){
        res.send(err);
    }
    if(docs.length){
        // User Found
        // TODO: Decrypt the password
        let decryptPassword = docs[0].password;
        if(decryptPassword==password){
            // Valid Password Entered

            // Signing In JWT token
            let token = jwt.sign(docs[0].password, process.env.CLIENT_SECRET);
            res.json({
                'error': false,
                'message' : 'Authentication Successful 😀',
                'token': token,
            })
        }else{
            // Invalid Password Entered
            res.json({'error': true, 'message': 'Invalid Username And Password'});
        }
    }else{
        // No User Found
        res.json({'error': true, 'message': 'Invalid Username And Password'});
    }
})

// Exporting app Routes
module.exports = app;