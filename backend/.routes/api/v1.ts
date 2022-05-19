const express = require('express')
const router = express.Router()
const {createUser} = require('../../controllers/users/createUser.js')
const {createSession} = require('../../controllers/users/createSession.js')
const {createRecord} = require('../../controllers/records/createRecord.js')
const {getRecord} = require('../../controllers/records/getRecord.js')

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

router.get('/users/login', (req: any, res: any) => {
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
export = router