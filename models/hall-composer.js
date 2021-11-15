/*
============================================
; Title:  Web 420- RESTFul API's
; Author: Professor Krasso
; Date: 11/12/2021
; Modified By: Keith Hall
; Description: Composer schema and database model.
;===========================================
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Use Mongoose for composer model.

// Composer Model
let composerSchema = new Schema({

    composerId: {type: Number, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    date_created: {type: String, required: true}

});

// Define model
var Composer = mongoose.model('Composer', composerSchema); // Mongoose maps composerSchema to Composer model.
module.exports = Composer;  // Makes this model accessible from other JavaScript files.

