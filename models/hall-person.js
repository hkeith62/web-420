/*
============================================
;   Title: WEB 420 – RESTful APIs
;   Author: Professor Krasso
;   Date: 11/20/2021
;   Modified By: Keith Hall
;   Description: Schemas, Person Model exported for use in the app.
===========================================
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Use Mongoose for person model.

 // Role schema
let roleSchema = new Schema({

    text: {type: String}
});

let dependentSchema = new Schema({

    firstName: {type: String},
    lastName: {type: String}
});
// Person schema
let personSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: {type: String}
});

// Define Person model
var Person = mongoose.model('Person', personSchema); // Mongoose maps personSchema to Person model.
module.exports = Person;  // Makes this model accessible from other JavaScript files.
