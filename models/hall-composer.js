/*
============================================
; Title:  Web 420- RESTFul API's
; Author: Professor Krasso
; Date: 11/12/2021
; Modified By: Keith Hall
; Description: Composer model and Schema.
;===========================================
*/
// Require and use Mongoose for Customer schema.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema defining structure of the Composer document and binds to variable
var composerSchema = new Schema({

    composerId: {type: Number},
    firstName: {type: String},
    lastName: {type: String},
    date_created: {type: String, default: new Date()}
});

// Define model
var Composer = mongoose.model('Composer', composerSchema); // Mongoose maps composerSchema to Composer model.
module.exports = Composer;  // Exports this model for accessibility from other JavaScript files.

