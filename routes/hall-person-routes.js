/*
============================================
;   Title: WEB 420 – RESTful APIs
;   Author: Professor Krasso
;   Date: 11/20/2021
;   Modified By: Keith Hall
;   Description: This file defines the endpoints for the Person API.
===========================================
*/
// Required modules
var express = require('express');
var router = express.Router();
var Person = require('../models/hall-person');

// OpenAPI Specification
/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     description: Creates new person in MongoDB.
 *     summary: Add a new person.
 *     requestBody:
 *       description: Person information.
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - birthDate
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *     responses:
 *       '200':
 *          description: New person record is added to MongoDB.
 *       '400':
 *         description: A problem has occurred. Full name and date of birth are required
 *       '501':
 *         description: MongoDB exception
 *       '500':
 *         description: Server has encountered an unexpected error
 */
 router.post('/persons', async(req, res) => {
    try {
        const newPerson = {

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            text: req.body.text,
            dependents: req.body.dependents
        }

        await Person.create(newPerson, function(err, person) {
            if (err) {
                console.log(err);
                res.status(400).send({
                    'message': `A problem has occurred. Full name and date of birth are required. ${err}`
                })
            } else {
                console.log(person);
                res.json(person);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(501).send({
            'message': `MongoDB exception ${e.message}`
        }),
        res.status(501).send({
            'message': `Server has encountered an unexpected error ${e.message}`
        })
    }
})
/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: Returns a list of all Persons in the MongoDB.
 *     summary: List all persons
 *     responses:
 *       '200':
 *         description: Returns an array of persons
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             description: Array of persons by firstName and lastName.
 *       '500':
 *         description: Server has encountered an unexpected error
 *       '501':
 *         description: MongoDB exception
 */
 router.get('/persons', async(req, res) => {
    try {
        Person.find({}, function(err, persons) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB exception ${err}`
                })
            } else {
                console.log(persons);
                res.json(persons);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server has encountered an unexpected error ${e.message}`
        })
    }
})

module.exports = router;