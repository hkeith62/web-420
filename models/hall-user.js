/*
============================================
; Title:  Web 420- RESTFul API's
; Author: Professor Krasso
; Date: 11/26/2021
; Modified By: Keith Hall
; Description: Database model, User Schema.
;===========================================
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Use Mongoose for user model.

// User schema
var userSchema = new Schema({

    userName: {type: String, required: true},
    Password: {type: String, required: true},
    emailAddress: {type: Array}

});

// Define model
var User = mongoose.model('User', userSchema); // Mongoose maps userSchema to User model.
module.exports = User;  // Makes this model accessible from other JavaScript files.

