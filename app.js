/*
;   Title: WEB 340 –  Node.js
;   Author: Professor Krasso
;   Date:10/21/2021
;   Modified By: Keith Hall
;   Description: This is server file for web-420 projects and assignments.
*/
/*jslint node: true */
"use strict";
/*jshint esversion: 6 */
// Calls all modules to be used in this assignment.
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const logger = require('morgan');

const app = express(); // Creates an express application and puts it inside the app variable.

app.set('port', process.env.PORT || 3000); //Tells server what port to listen on.

app.use(express.json()); // Parses JSON request objects.
app.use(express.urlencoded({'extended': true})); // Parses incoming requests encoded in the url as a string or an array.
app.use(logger("short")); // Morgan logger

// Create an object literal.
const options = {definition: {openApi: '3.0.0', info: {title: 'WEB 420 RESTful APIs', version: '1.0.0'}},
        apis: ['./routes*.js']};

const openApiSpecification = swaggerJSDoc(options); // Creates new openApiSpec variable that calls the swaggerJsdoc library with the options literal.

app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(openApiSpecification, { explorer: true })); // openApiSpecification variable is wired to the app variable.

http.createServer(app).listen(app.get('port'), function () {
    console.log('Application started on port ' + app.get('port')); // Starts the server listening on port 3000 using ('port') variable.
});


