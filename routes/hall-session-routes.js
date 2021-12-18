/*
============================================
;   Title: WEB 420 – RESTful APIs
;   Author: Professor Krasso
;   Date: 11/26/2021
;   Modified By: Keith Hall
;   Description: This file defines the endpoints for the Signup and Login APIs.
===========================================
*/
// Required modules
var express = require('express');
var User = require('../models/hall-user');
var bcrypt = require('bcryptjs');
var router = express.Router();
var saltRounds = 10;

// OpenAPI Specification
/**
 * signUp
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Users
 *     description: Registers a new user account in MongoDB.
 *     summary: Sign up a new user.
 *     requestBody:
 *       description: Account access information.
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *          description: User was added to MongoDB.
 *       '400':
 *         description: A problem has occurred. Username is a required field
 *       '401':
 *         description: Username is already in use
 *       '501':
 *         description: MongoDB exception
 *       '500':
 *         description: Server has encountered an unexpected error
 */
 router.post('/signup', async(req, res) => {

    try {

        var hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password

        // JavaScript object containing the key-value pairs submitted in the request body
        var newRegisteredUser = {

            userName: req.body.userName,
            password: hashedPassword,
            emailAddress: req.body.emailAddress
        };

        User.findOne({'userName': req.body.userName}, function(err, user) { // Search MongDB for username

            if (User) {

               User.create(newRegisteredUser, function(err, user) {  // Create new user

                    console.log(`User added to MongoDB ${user}`);
                    res.json(user);
                })

            }else{

                console.log(err);
                res.status(501).send({

                    'message': `MongoDB Exception ${err.message}`
                })
            }
        })

            if (!User) {          // If username already exists

                console.log(err);
                res.status(401).send({

                    'message': `Username is already in use ${err.message}`
                })
            }

    } catch (err) {
        console.log(err);
        res.status(400).send({
            'message': `A problem has occurred. Username and password are required fields. ${err.message}`
        })
        res.status(500).send({
            'message': `Server has encountered an unexpected error${err.message}`
        })
    }
})

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     summary: User login
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/login', async(req, res) => {

    try {

        User.findOne({'userName': req.body.userName}, function(err, user) {

            if (err) {

                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })

            } else {

                console.log(user)

            if (!user) {

                let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                if (passwordIsValid) {

                    console.log('Password matches');
                    res.status(200).send({

                        'message': 'User logged in'
                    })

                } else {

                    console.log('Password is incorrect');
                    res.status(401).send({
                        'message': `A problem occurred. Please check password`
                    })
                }
            }
        }

            if (user) {

                console.log('Invalid password');
                res.status(401).send({

                       'message': 'A problem occurred. Please check password'
               })

            }
        })

    } catch (e) {

        console.log(e);
        res.status(400).send({
            'message': 'A problem occurred. Username and password are required'
        })
        res.status(500).send({
            'message': 'Server has encountered an unexpected error'
        })
    }
})
module.exports = router;




