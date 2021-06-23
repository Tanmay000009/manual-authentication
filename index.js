const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));  

var mongoDB = 'mongodb://localhost:27017/social';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Using express router
app.use('/',require('./routes')) 



app.listen(3000, function(err) {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    } else {
        console.log(`Server is running on port: ${port}`);
    }
});