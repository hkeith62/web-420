/*
============================================
;   Title: WEB 420 – RESTful APIs
;   Author: Professor Krasso
;   Date: 11/29/2021
;   Modified By: Keith Hall
;   Description: This file defines the interface for the Customer API.
===========================================
*/
// Required modules
var express = require('express');
var Customer = require('../models/hall-customer');   // Binds Customer Module to a variable

var router = express.Router();

// OpenAPI Specification
/**
 * findAllCustomers
 * @openapi
 * /api/customers:
 *   get:
 *     tags:
 *       - Customers
 *     description: Returns a list of all customers in MongoDB
 *     summary: List all customers
 *     responses:
 *       '200':
 *         description: Returns an array of customers
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             description: List customers by first and last name, username, and invoices
 *             items:
 *               type: array
 *               required:
 *                 - firstName
 *                 - lastName
 *                 - userName
 *                 - invoices
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 invoices:
 *                   type: array
 *                   items:
 *                       type: object
 *                       properties:
 *                           subtotal:
 *                               type: number
 *                           tax:
 *                               type: number
 *                           dateCreated:
 *                               type: string
 *                           dateShipped:
 *                               type: string
 *                           lineItems:
 *                               type: array
 *       '500':
 *         description: Server has encountered an unexpected error
 *       '501':
 *         description: MongoDB Exception
 */
 router.get('/customers', async(req, res) => {

    try {

        Customer.find({}, function(err, customer) {  // Finds all team documents

            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `Server has encountered an unexpected error ${err}`
                })

            } else {
                console.log(customer); // Display team documents in the console
                res.json(customer);
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
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     description: Creates a new customer record in MongoDB
 *     summary: Add a new customer.
 *     requestBody:
 *       description: Customer record.
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *               - invoices
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *               invoices:
 *                 type: array
 *     responses:
 *       '200':
 *          description: |
 *           * The new customer record is added to MongoDB
 *           * MongoDB returns a confirmation message
 *       '401':
 *         description: Username already in use
 *       '400':
 *         description: A problem has occurred. First name, last name, and username are required fields
 *       '500':
 *         description: Server encountered an unexpected error
 *       '501':
 *         description: MongoDB exception
 */
// API Endpoints
 router.post('/customers', async(req, res) => {    // Post request

    try {

        var err = 'Try again!';

        var newCustomer = {                      // JavaScript object containing the key-value pairs to be submitted in the request body
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            invoices: req.body.invoices
         }

        Customer.findOne({'userName': req.body.userName}, function(err, customers) { // Search MongDB for first customer document with username matching the request body

            if (Customer) {  // If no username matches

               Customer.create(newCustomer, function(err, customer) {  // Create new customer

                    console.log(`Customer added to MongoDB ${customers}`);
                    res.json(customers);
                })

            }else{

                // Error handling
                console.log(err);
                res.status(500).send({

                    'message': `Server has encountered an unexpected error ${err.message}`
                })
            }
        })

        if (!Customer) {    // If username already exists

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
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     description: Creates an invoice in MongoDB by username
 *     summary: Create an invoice by username
 *     requestBody:
 *       description: Customer record.
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               userName:
 *                 type: string
 *               subtotal:
 *                 type: string
 *               tax:
 *                 type: string
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *     responses:
 *       '200':
 *          description: |
 *           * The new invoice is created by username and added to MongoDB
 *           * MongoDB returns a confirmation message
 *       '401':
 *         description: Username already in use
 *       '400':
 *         description: A problem has occurred. Username is a required field
 *       '500':
 *         description: Server encountered an unexpected error
 *       '501':
 *         description: MongoDB exception
 */
 router.post('/customers/:username/invoices', async(req, res) => {

    try {

        var err = 'Try again!';

        var newInvoice = {                      // JavaScript object containing the key-value pairs to be submitted in the request body

            userName: req.params.username,
            subtotal: req.body.subtotal,
            tax: req.body.tax,
            dateCreated: req.body.dateCreated,
            dateShipped: req.body.dateShipped,
            lineItems: req.body.lineItems
        }

        Customer.findOne({'userName': req.params.username}, function(err, customers) {   // Search MongDB for username entered in the request body

            if (Customer) {


                Customer.create(newInvoice, function(err, customer) {  // Create new customer with username

                     console.log(`Invoice added to username: ${userName}`)
                     res.json(customers);
                })

            }else {

                // Error handling
                console.log(err);
                res.status(500).send({

                    'message': `Server has encountered an unexpected error ${err.message}`
                })
            }
        })

    } catch (err) {

        console.log(err);
        res.status(400).send({
            'message': `A problem occurred. Username is a required field ${err.message}`
        }),

        res.status(501).send({
              'message': `MongoDB exception ${err.message}`
        })
    }
})
// OpenAPI Specification
/**
 * findAllInvoicesByUsername
 * @openapi
 * /api/customers/invoices/username:
 *   get:
 *     tags:
 *       - Customers
 *     description: Returns a list of user invoices by username
 *     summary: Return all user invoices
 *     responses:
 *       '200':
 *         description: Returns an array of invoices
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             description: Array of invoices
 *             items:
 *               type: array
 *               required:
 *                 - invoices
 *               properties:
 *                 invoices:
 *                   type: string
 *       '404':
 *         description: Record not found. Please check username
 *       '400':
 *         description: A problem has occurred. Username is a required field
 *       '500':
 *         description: Server encountered an unexpected error
 *       '501':
 *         description: MongoDB exception
 */
 router.get('/customers/:username/invoices', async(req, res) => {

    try {

        Customer.findOne({'userName':req.params.username}, function(err, customers) {

            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception ${err}`
                })

            } else {
                console.log(customers);
                res.json(customers);
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
