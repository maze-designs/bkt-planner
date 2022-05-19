const express = require('express')
const router = express.Router()
const {createUser} = require('./createUser')
const {createSession} = require('./createSession')
const {createRecord} = require('./createRecord')
const {getRecord} = require('./getRecord')

// https://expressjs.com/en/guide/routing.html

// middleware that is specific to this router
router.use((req: any, res: any, next: any) => {
  console.log('Time: ', Date.now())
  next()
})
router.get('/', (req: any, res: any) => {
  res.send('api up')
})

// Users

router.post('/users', (req: any, res: any) => {
  createUser(req, res)
})

router.post('/users/login', (req: any, res: any) => {
  createSession(req, res)
})

// Records

router.post('/records', (req: any, res: any) => {
  console.log("post record")
  createRecord(req, res)
})

router.get('/records', (req: any, res: any) => {
  getRecord(req, res)
})

router.get('/sampledata', (req: any, res:any) => {
  res.send({
    "user": "testuser",
    "addedDate": "1652794173741",
    "startDate": "1747562400",
    "endDate": "1747565100",
    "name": "Test Record",
    "description": "asdLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
})
})

export = router