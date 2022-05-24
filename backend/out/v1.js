"use strict";
const express = require('express');
const router = express.Router();
const { createUser } = require('./createUser');
const { createSession } = require('./createSession');
const { createRecord } = require('./createRecord');
const { getRecord } = require('./getRecord');
const { validateSession } = require('./dbfuncs');
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
router.post('/users/login', (req, res) => {
    createSession(req, res);
});
router.get('/users/checkSession', (req, res) => {
    res.send({ 'valid': true });
    //TODO:
});
// Records
router.post('/records', (req, res) => {
    console.log("post record");
    createRecord(req, res);
});
router.get('/records', (req, res) => {
    getRecord(req, res);
});
router.get('/sampledata', (req, res) => {
    res.send({
        "user": "testuser",
        "addedDate": "1652794173741",
        "startDate": "1747562400",
        "endDate": "1747565100",
        "name": "Test Record",
        "description": "asdLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    });
});
module.exports = router;
//# sourceMappingURL=v1.js.map