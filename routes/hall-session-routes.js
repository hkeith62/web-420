/*
============================================
;   Title: WEB 420 – RESTful APIs
;   Author: Professor Krasso
;   Date: 11/26/2021
;   Modified By: Keith Hall
;   Description: This file defines the endpoints for the User API.
===========================================
*/
// Required modules
var express = require('express');
var User = require('../models/hall-user');
var bcrypt = require('bcrypt');

var router = express.Router();
var saltRounds = 10;

// OpenAPI Specification
/**
 * signUp
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Sign Up
 *     description: Registers a new User Account in MongoDB.
 *     summary: Sign up a user.
 *     requestBody:
 *       description: User Account access information.
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *               emailAddress:
 *                 type: array
 *     responses:
 *       '200':
 *          description: User information was added to MongoDB.
 *       '400':
 *         description: A problem has occurred. Username is a required field
 *       '401':
 *         description: Username is already in use
 *       '501':
 *         description: MongoDB exception
 *       '500':
 *         description: Server has encountered an unexpected error
 */
 router.post('/signup', async (req, res) => {

    try {

        var err = 'Try again!';

        var hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password

        // JavaScript object containing the key-value pairs submitted in the request body
        var newRegisteredUser = {

            userName: req.body.userName,
            Password: hashedPassword,
            emailAddress: req.body.emailAddress
        }

        User.findOne({'userName': req.body.userName}, function(err, user) {

            if (User) {

               User.create(newRegisteredUser, function(err, user) {

                    console.log(user);
                    res.json(user);
                })

            }else{

                console.log(err);
                res.status(500).send({

                    'message': `Server has encountered an unexpected error ${err.message}`
                })
            }
        })

            if (!User) {

                console.log(err);
                res.status(401).send({

                    'message': `Username is already in use ${err.message}`
                })
            }

    } catch (err) {
        console.log(err);
        res.status(400).send({
            'message': `A problem has occurred. Username and Password are required fields. ${err.message}`
        })
        res.status(501).send({
            'message': `MongoDB exception ${err.message}`
        })
    }
})
/**
 * verify-password
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Login
 *     summary: Login users for account access
 *     requestBody:
 *       description: Login information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *               emailAddress:
 *                 type: array
 *     responses:
 *       '200':
 *         description: User is logged in
 *       '401':
 *         description: Invalid username or password
 *       '400':
 *         description: Username and password are required fields
 *       '501':
 *         description: MongoDB Exception
 *       '500':
 *         description: Server has encountered an unexpected error
 */
 router.post('/login', async(req, res) => {

    try {

        var err = 'Try again!';

        User.findOne({'userName': req.body.userName}, function(err, user) {

            if (!User) {

                var passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // Compare requestBody password with user password

                if (passwordIsValid) {

                    console.log('Password matches');
                    res.status(200).send({

                        'message': 'User is logged in'
                    })

                }else{

                    console.log('Password is incorrect');
                    res.status(401).send({

                        'message': `Invalid password ${err.message}`
                    })
                }
            }
        })

            if (User) {

                console.log('Invalid Username');
                res.status(401).send({
                        'message': `Invalid username or password`
                })
            }

    } catch (e) {

        console.log(err);
        res.status(400).send({

            'message': `Username and password are required fields ${err}`
        })
        res.status(501).send({
            'message': `MongoDB Exception ${err}`
        })
        res.status(500).send({
            'message': `Server has encountered an unexpected error ${err}`
        })
    }
})

module.exports = router;

