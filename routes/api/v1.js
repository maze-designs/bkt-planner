"use strict";
const express = require('express');
const router = express.Router();
const { createUser } = require('../../controllers/users/createUser.js');
const { createSession } = require('../../controllers/users/createSession.js');
const { createRecord } = require('../../controllers/records/createRecord.js');
const { getRecord } = require('../../controllers/records/getRecord.js');
// https://expressjs.com/en/guide/routing.html
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', (req, res) => {
    res.send('api up');
});
// Users
router.post('/users', (req, res) => {
    createUser(req, res);
});
router.get('/users/login', (req, res) => {
    createSession(req, res);
});
// Records
router.post('/records', (req, res) => {
    console.log("post record");
    createRecord(req, res);
});
router.get('/records', (req, res) => {
    getRecord(req, res);
});
module.exports = router;
