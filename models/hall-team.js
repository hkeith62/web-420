/*
============================================
;   Title: WEB 420 – RESTful APIs
;   Author: Professor Krasso
;   Date: 12/15/2021
;   Modified By: Keith Hall
;   Description: Team API.
===========================================
*/
// Require and use Mongoose for Customer schema.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    player_id: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    position: {type: String},
    hire_date: {type: String, default: new Date()},
    annual_salary: {type: Number}
});

// Schema defining structure of the Composer document and binds to variable
var teamSchema = new Schema({

    name: {type: String},
    home_field: {type: String},
    phone: {type: String},
    email: {type: String},
    admission_date: {type: String, default: new Date()},
    players: [playerSchema],
    mascot: {type: String},



});

// Define model
var Team = mongoose.model('Team', teamSchema); // Mongoose maps composerSchema to Composer model.
module.exports = Team;  // Exports this model for accessibility from other JavaScript files.

