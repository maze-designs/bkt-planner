const JSONdb = require('simple-json-db')
import 'dotenv/config'
import path from 'path'
import faunadb from 'faunadb'

const faunaKey = process.env.FAUNA_KEY ?? ''
if (!faunaKey) {
    console.log('error: FAUNA_KEY not set (.env)')
    process.exit(1)
}

// EXPORTS:
export const q = faunadb.query
export const client = new faunadb.Client({
    secret: faunaKey,
    domain: 'db.eu.fauna.com',
    port: 443,
    scheme: 'https',
  })





export const users = new JSONdb(path.join("./db-users.json"))
export const records = new JSONdb(path.join("./db-records.json"))
export const config = new JSONdb(path.join("./db-config.json"))
export const perms = new JSONdb(path.join("./db-perms.json"))
export const sessions = new JSONdb(path.join("./db-sessions.json"))
