import { parseJsonText } from "typescript";
import { users, sessions } from "../../src/db.js";
import bcrypt from 'bcrypt';
import { random } from "colors/safe";
import { randomBytes } from "crypto";

export async function createSession(req: any, res: any) {

    if (users.has(req.body.username)) {
        bcrypt.compare(req.body.password, users.get(req.body.username).password, (err: any, result: Boolean) => {
            if (result) {
                console.log((`[OK] password for ${req.body.username} valid`))
                let session = {
                    "user": req.body.username,
                    "expires": new Date().setDate(new Date().getDate() + 14),
                    "created": Date.now().toString()
                }

                while(true) {
                    let token = randomBytes(16).toString('hex');
                    if (!sessions.has(token)) {
                        sessions.set(token, session)
                        res.send(token)
                        break
                    }
                }
            }
            else {
                console.log(("[FAILED] password invalid"))
                res.status(401)
                res.send("invalid password")

                }
            }
        )
    }
    else {
        res.status(401).send("invalid user")
    }
}