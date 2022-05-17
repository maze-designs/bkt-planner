import { q, client } from '../../src/db.js';
import bcrypt from 'bcrypt';


async function userExists(username: string) {
    return await client.query(q.Exists(q.Match(q.Index('users_by_username'), username)))
}

export async function createUser(req: any, res: any) {
    if(!await userExists(req.body.username)) {
    let hash:string = await bcrypt.hash(req.body.password, 10)
    let data = {
        username: req.body.username,
        "displayName": req.body.displayName,
        "password": hash,
        "perms": "user"
    }

    client.query(q.Create(
        q.Collection("users"),
        {
          data: data
        }
      ))
      res.status(200).send("user created")
      // TODO: check if passed
    }
    else {
        res.status(401).send("User already exists")
    }
}

