/*
============================================
; Title:  Web 420- RESTFul API's
; Author: Professor Krasso
; Date: 11/29/2021
; Modified By: Keith Hall
; Description: Customer model and Schemas.
;===========================================
*/
// Require and use Mongoose for Customer schema.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 // Schema defining structure of the lineItem document and binds to variable
var lineItemSchema = new Schema({

    name: {type: String},
    price: {type: Number},
    quantity: {type: String}
});

// Schema defining structure of the Invoice document
var invoice = new Schema({

    subTotal: {type: Number},
    tax: {type: Number},
    dateCreated: {type: String},
    dateShipped: {type: String},
    lineItems: [lineItemSchema]    // Nested Schema
});

// Schema defining structure of the Customer document
var customerSchema = new Schema({

    firstName: {type: String},
    lastName: {type: String},
    userName: {type: String, required: true},
    invoices: [invoice]          // Two Nested schema: lineItemSchema and invoice
});

// Define Customer Model
var Customer = mongoose.model('Customer', customerSchema); // Mongoose maps customerSchema to Customer model.
module.exports = Customer;  // Exports Customer model and all schema as a module accessible by other js files.



