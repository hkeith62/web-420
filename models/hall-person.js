/*
============================================
;   Title: WEB 420 – RESTful APIs
;   Author: Professor Krasso
;   Date: 11/20/2021
;   Modified By: Keith Hall
;   Description: Person model and Schemas.
===========================================
*/
// Require and use Mongoose for Customer schema.
var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Use Mongoose for person model.

// Schema defining structure of the roleSchema document and binds to variable
var roleSchema = new Schema({

    text: {type: String}
});

// Schema defining structure of the dependentSchema document
var dependentSchema = new Schema({

    firstName: {type: String},
    lastName: {type: String}
});

// Schema defining structure of the personSchema document
var personSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    roles: [roleSchema],            // Nested Schema
    dependents: [dependentSchema],
    birthDate: {type: String}
});

// Define Person model
var Person = mongoose.model('Person', personSchema); // Mongoose maps personSchema to Person model.
module.exports = Person;  // Makes this model and all schema accessible from other JavaScript files.
