/*
============================================
; Title:  Web 420- RESTFul API's
; Author: Professor Krasso
; Date: 11/26/2021
; Modified By: Keith Hall
; Description: User Model and Schema.
;===========================================
*/
// Require and use Mongoose for Customer schema.
var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Use Mongoose for user model.

// Schema defining structure of the userSchema document and binds to variable
var userSchema = new Schema({

    userName: {type: String},
    password: {type: String},
    emailAddress: {type: Array}

});

// Define model
var User = mongoose.model('User', userSchema); // Mongoose maps userSchema to User model.
module.exports = User;  // Exports this model for accessibility from other JavaScript files.

