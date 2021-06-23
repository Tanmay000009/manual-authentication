const { response } = require('express');
const User = require('../models/user');

module.exports.profile = function(req,res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id,function(err,user) {
            if (user) {
                return res.render('userprofile', {
                    title: 'User-'+ user.name,
                    username: user.name,
                    useremail: user.email 
                })
            }
        });
        // Here else is very important, as code will work asynchronusly
        // So when we just return without else, niche wala bhi return krenga and uper wala bhi
        // So error aayegi
    } else {
        return res.redirect('/users/sign-in');
    }
}

// Render the sign up page
module.exports.signUp = function(req,res) {
    return res.render('user_signup', {
        title: 'Signup'
    })
}

// Render the sign in page
module.exports.signIn = function(req,res) {
    return res.render('user_signin', {
        title: 'Signin'
    })
}

// Get the signup data
module.exports.create = function(req,res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user) {
        if (err) {
            console.log("Error in finding user and sign-ing up");
            return;
        }
        if (!user) {
            User.create(req.body, function(err,user) {
                if (err) {
                    console.log("Error in finding user and signup");
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('/users/sign-in');
        }
    })
}

// Sign In and create a session for user
module.exports.createSession = function(req,res) {
    // Find the user
    User.findOne({email: req.body.email}, function (err,user) {
        if (err) {
            console.log('Error in finding user while signing in');
            return;
        }
        

    // Handle User Found
        if (user) {

        
        // Handle passwords which doesnt match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }

        // Handle Session Creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
            
    } else {
    // Handle User Not found
        return response.redirect('back');
    } 
    });
}

module.exports.endSession = function(req, res) {
    res.cookie('user_id',"");
    return res.redirect('/users/sign-in');
}