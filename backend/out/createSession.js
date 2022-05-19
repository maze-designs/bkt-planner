"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = require("crypto");
const dbfuncs_1 = require("./dbfuncs");
// async function sessionIdExists(session: string) {
//     return await client.query(q.Exists(q.Match(q.Index('sessions_by_id'), session)))
// } NOTE: pada
// async function checkHash(password: string, req: any) {
//     // const hash = await client.query(q.Select(['password'], q.Get(q.Match(q.Index('users_by_hash'), req.body.username))))
//     // return await bcrypt.compare(password, hash)
// return true
// }
async function createSession(req, res) {
    console.log(req.body);
    console.log(req.body.username);
    if (req.body.username && req.body.password) {
        const hash = await (getUserHash(req.body.username));
        const password = req.body.password;
        const valid = await bcrypt_1.default.compare(password, hash);
        const userRef = await (0, dbfuncs_1.getUserRefFromUsername)(req.body.username);
        if (valid) {
            let sessionId = (0, crypto_1.randomBytes)(16).toString('hex');
            const data = {
                sessionId: sessionId,
                user: req.body.username,
                userRef: userRef,
                expires: new Date().setDate(new Date().getDate() + 14),
                created: Date.now()
            };
            const sessionRef = await db_1.client.query(db_1.q.Create(db_1.q.Collection('sessions'), { data: data }));
            res.status(200).send({ 'sessionId': sessionId });
            console.log(await (0, dbfuncs_1.validateSession)(sessionId, req.body.username));
        }
        else {
            res.send({ 'error': 'invalid password' });
        }
    }
    else {
        res.send({ 'error': 'no credentials' });
    }
}
exports.createSession = createSession;
async function getUserHash(username) {
    let userhash = await (await db_1.client.query(db_1.q.Get(db_1.q.Match(db_1.q.Index("hash_from_username"), username))));
    return userhash.data.password;
}
//# sourceMappingURL=createSession.js.map