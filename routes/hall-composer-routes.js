/*
============================================
;   Title: WEB 420 – RESTful APIs
;   Author: Professor Krasso
;   Date: 11/08/2021
;   Modified By: Keith Hall
;   Description: Composer API
===========================================
*/
// Required modules
var express = require('express');
var Composer = require('../models/hall-composer');

var router = express.Router();

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
 *             description: List composers by id, firstName, lastName, and date record was created
 *             items:
 *               type: array
 *               required:
 *                 - composerId
 *                 - firstName
 *                 - lastName
 *                 - date_record_created
 *               properties:
 *                 composerId:
 *                   type: number
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 date_created:
 *                   type: string
 *       '500':
 *         description: Server has encountered an unexpected error
 */
router.get('/composers', async(req, res) => {

    try {

        Composer.find({}, function(err, composers) {  // Searches composer documents
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
 *     description: Finds and displays the composer's MongoDB record using id.
 *     summary: Find a composer by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: |
 *           A unique identifier generated
 *           and assigned to each composer
 *           by MongoDB.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *          description: |
 *            Returns the composer record
 *            that matches the id entered.
 *          content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                 type: object
 *               required:
 *                 - composerId
 *                 - firstName
 *                 - lastName
 *                 - date_created
 *       '401':
 *         description: A problem occurred. Please check id
 *       '500':
 *         description: Server has encountered an unexpected error
 *       '501':
 *         description: MongoDB exception
 */
 router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            if (err) {

                console.log(err);
                res.status(401).send({
                    'message': `A problem occurred. Please check id ${err}`
                }),
                res.status(501).send({
                    'message': `MongoDB exception ${e.message}`
              })

            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(401).send({
            'message': `A problem occurred. Id is a required field ${e.message}`
        }),
        res.status(500).send({
            'message': `Server has encountered an unexpected error ${e.message}`
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
 *         application/json:
 *           schema:
 *             required:
 *               - composerId
 *               - firstName
 *               - lastName
 *               - date_created
 *             properties:
 *               composerId:
 *                 type: number
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               date_created:
 *                 description: new Date();
 *                 type: string
 *     responses:
 *       '200':
 *          description: |
 *           * The new composer record is added to the directory
 *           * Returns confirmation message
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
                res.status(501).send({
                    'message': `MongoDB Exception. ${err}`
                })
            } else {
                console.log(`Composer Added to MongoDB ${composer}`);
                res.json(composer);
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
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     name: updateComposer
 *     description: Updates an existing composer document in MongoDB.
 *     summary: Update an existing composer.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id to filter the collection by.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.put('/composers/:id', async (req, res) => {
    try {

        var composerDocId = req.params.id;

        Composer.findOne({'_id': composerDocId}, function(err, composer) {

            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);

                composer.set({
                    type: req.body.type
                });

                composer.save(function(err, updatedComposer) {
                    if (err) {
                        console.log(err);
                        res.json(updatedComposer);
                    } else {
                        console.log(updatedComposer);
                        res.json(updatedComposer);
                    }
                })
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server has encountered an unexpected error: ${e.message}`
        })
    }
})
/**
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     name: deleteComposer
 *     description: API for deleting a composer document from MongoDB.
 *     summary: Removes a composer from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to remove.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer Deleted
 *       '401':
 *         description: A problem occurred. Please check id
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.delete('/composers/:id', async (req, res) => {
    try {
        const composerDocId = req.params.id;

        Composer.findByIdAndDelete({'_id': composerDocId}, function(err, composer) {
            if (err) {

                console.log(err);
                res.status(401).send({
                    'message': `A problem occurred. Please check id: ${err}`
                }),
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {

        console.log(e);
        res.status(401).send({
            'message': `A problem occurred. Please check id ${e.message}`
        }),
        res.status(500).send({
            'message': `Server has encountered an unexpected error: ${e.message}`
        })
    }
})

module.exports = router;
