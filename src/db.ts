const JSONdb = require('simple-json-db')            // (docs)[https://www.npmjs.com/package/simple-json-db]

const path = require('path')
// const colors = require('colors/safe')



export const users = new JSONdb(path.join("./db-users.json"))
export const records = new JSONdb(path.join("./db-records.json"))
export const config = new JSONdb(path.join("./db-config.json"))
export const perms = new JSONdb(path.join("./db-perms.json"))
export const sessions = new JSONdb(path.join("./db-sessions.json"))

// nvm didn't think the library has this already implemented TODO: cleanup?
// let failed: Array<string> = []

// users.set('key-test', 'value-test')
// records.set('key-test', 'value-test')
// config.set('key-test', 'value-test')

// if (users.get('key-test') != 'value-test') { failed.push('users') } 
// if (records.get('key-test') != 'value-test') { failed.push('records') }
// if (config.get('key-test') != 'value-test') { failed.push('config') }

// if(failed.length != 0) {
//     console.log(colors.red(`[FAILED] dbs: ${failed}`))
//     console.log(`Check if you have permissions for writing to the db-*.json files.`)
// }
// else {
//     console.log(colors.green(`[PASSED] dbs`))
// }

// users.delete('key-test')
// records.delete('key-test')
// config.delete('key-test')