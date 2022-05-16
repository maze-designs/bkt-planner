import { users } from '../../src/db.js';
import bcrypt from 'bcrypt';
import colors from 'colors/safe';



export async function createUser(req: any, res: any) {

    // console.log(req)
    console.log(req.body.username)
    // res.send('apiv1: createUser')
     await bcrypt.hash(req.body.password, 10, (err: any, hash: String) => {
         if (!users.has(req.body.username)) {
             let data = {
                 "displayName": req.body.displayName,
                 "password": hash,
                 "sessions": [], // TODO: session
                 "perms": "user"
                 // TODO: add more data?
             }
             users.set(req.body.username, data)
             users.set()
             res.send('user created')
         }
         else {
             console.log(colors.red(`[FAILED] user ${req.body.username} already exists`))
             res.send('user already exists')
             // TODO: throw error
         }
     })
}

