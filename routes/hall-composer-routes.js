/*
============================================
;   Title: WEB 420 – RESTful APIs
;   Author: Professor Krasso
;   Date: 11/08/2021
;   Modified By: Keith Hall
;   Description: This file defines the endpoints for the Composer API.
===========================================
*/
// Required modules
var express = require('express');
var router = express.Router();
var Composer = require('../models/hall-composer');

// OpenAPI Specification
/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: Returns a list of all composers in the directory
 *     summary: List all composers
 *     responses:
 *       '200':
 *         description: Returns an array of composers
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             description: Array of composers by id, firstName, and lastName
 *             items:
 *               type: array
 *               required:
 *                 - composerId
 *                 - firstName
 *                 - lastName
 *               properties:
 *                 composerId:
 *                   type: number
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *       '500':
 *         description: Server has encountered an unexpected error
 */
router.get('/composers', async(req, res) => {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `Server has encountered an unexpected error ${err}`
                })
            } else {
                console.log(composers);
                res.json(composers);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server has encountered an unexpected error ${e.message}`
        })
    }
})
/**
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description: Finds and displays the composer's name and biographical record using id.
 *     summary: Find a composer by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: |
 *           A unique 7 digit identifier generated
 *           and assigned to each composer
 *           by the user.
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *          description: |
 *            Returns the composer's name
 *            and biographical record that matches
 *            the id entered.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *               required:
 *                 - composerId
 *                 - firstName
 *                 - lastName
 *                 - dateOfBirth
 *                 - placeOfBirth
 *                 - date_record_created
 *                 - other
 *       '401':
 *         description: A problem occurred. Please check id
 *       '400':
 *         description: Id is a required field
 *       '500':
 *         description: Server has encountered an unexpected error
 *       '501':
 *         description: MongoDB exception
 */
 router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findById(req.params.id, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(401).send({
                    'message': `A problem occurred. Please check id. ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(400).send({
            'message': `Id is a required field ${e.message}`
        }),
        res.status(500).send({
            'message': `Server has encountered an unexpected error ${e.message}`
        }),
        res.status(501).send({
              'message': `MongoDB exception ${e.message}`
    })
    }
})
/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     description: Creates new composer and biographical record in the directory
 *     summary: Add a new composer.
 *     requestBody:
 *       description: Composer biographical record.
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             required:
 *               - composerId
 *               - firstName
 *               - lastName
 *               - date_record_created
 *             properties:
 *               composerId:
 *                 type: number
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               date_record_created:
 *                 description: new Date();
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               placeOfBirth:
 *                 type: string
 *               other:
 *                 description: Any additional details the user wishes to add
 *                 type: string
 *     responses:
 *       '200':
 *          description: |
 *           * The new composer record is added to the directory
 *           * Returns confirmation message containing the composer's id, name,
 *           and record entry date.
 *       '400':
 *         description: A problem has occurred. Name, id, and entry date are required
 *       '500':
 *         description: Server encountered an unexpected error
 *       '501':
 *         description: MongoDB exception
 */
router.post('/composers', async(req, res) => {
    try {
        // JavaScript object containing the key-value pairs submitted in the request body
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            composerId: req.body.composerId,
            date_created: req.body.date_created
        }
        // Accesses parsed request bodies
        await Composer.create(newComposer, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(400).send({
                    'message': `A problem has occurred. Name, id, and entry date are required. ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server has encountered an unexpected error ${e.message}`
        }),
        res.status(501).send({
            'message': `MongoDB exception ${e.message}`
        })
    }
})
module.exports = router;
