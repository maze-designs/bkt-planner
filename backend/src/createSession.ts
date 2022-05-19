import { parseJsonText } from "typescript";
import { q, client } from "./db";
import bcrypt from 'bcrypt';
import { random } from "colors/safe";
import { randomBytes } from "crypto";
import { getUserRefFromUsername, validateSession, removeSession } from "./dbfuncs";

// async function sessionIdExists(session: string) {
//     return await client.query(q.Exists(q.Match(q.Index('sessions_by_id'), session)))
// } NOTE: pada

// async function checkHash(password: string, req: any) {
//     // const hash = await client.query(q.Select(['password'], q.Get(q.Match(q.Index('users_by_hash'), req.body.username))))
//     // return await bcrypt.compare(password, hash)

// return true
// }

export async function createSession(req: any, res: any) {
    console.log(req.body)
    console.log(req.body.username)
    if(req.body.username && req.body.password) {
    const hash = await (getUserHash(req.body.username))
    const password = req.body.password
    const valid = await  bcrypt.compare(password, hash)
    const userRef = await getUserRefFromUsername(req.body.username)
    
    if (valid) {
        let sessionId = randomBytes(16).toString('hex')
        const data = {
            sessionId: sessionId,
            user: req.body.username,
            userRef: userRef,
            expires: new Date().setDate(new Date().getDate() + 14),
            created: Date.now()
        }
        const sessionRef = await client.query(q.Create(q.Collection('sessions'), { data: data }))
        res.status(200).send({ 'sessionId': sessionId })
        console.log(await validateSession(sessionId, req.body.username))
        
    } else {
        res.send({ 'error': 'invalid password' })
}
}
else {
    res.send({ 'error': 'no credentials' })
}
}

async function getUserHash(username: string) {
    type userhash = {
        data: {
            password: string
        }
    }

    let userhash: userhash = await (await client.query(
        q.Get(q.Match(q.Index("hash_from_username"), username))
    ))
return userhash.data.password
}