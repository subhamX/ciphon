const express  = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/auth-middleware')


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true}, (err)=>{
    console.log(err);
});

app.use(express.json());

app.get('/', authMiddleware, (req, res)=> {
    console.log('WORKING');
    res.json({
        "message":"Congrats! 🙂"
    })
})

app.use('/auth/', authRoutes);


app.listen(8000, () => console.log('Listening'))