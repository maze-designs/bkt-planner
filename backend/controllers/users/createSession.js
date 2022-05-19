"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const db_js_1 = require("../../src/db.js");
function sessionIdExists(session) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_js_1.client.query(db_js_1.q.Exists(db_js_1.q.Match(db_js_1.q.Index('sessions_by_id'), session)));
    });
}
// async function checkHash(password: string, req: any) {
//     // const hash = await client.query(q.Select(['password'], q.Get(q.Match(q.Index('users_by_hash'), req.body.username))))
//     // return await bcrypt.compare(password, hash)
// return true
// }
function createSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield db_js_1.client.query(db_js_1.q.Map(db_js_1.q.Paginate(db_js_1.q.Match(db_js_1.q.Index("users_by_hash"), "req.body.username")), db_js_1.q.Lambda("userRef", db_js_1.q.Get(db_js_1.q.Var("userRef")))));
        res.status(200).send("session created"); // TODO:
        // if (users.has(req.body.username)) {
        //     bcrypt.compare(req.body.password, users.get(req.body.username).password, (err: any, result: Boolean) =>
        // {
        //                 if (result) {
        //             console.log((`[OK] password for ${req.body.username} valid`))
        //             let session = {
        //                 "user": req.body.username,
        //                 "expires": new Date().setDate(new Date().getDate() + 14),
        //                 "created": Date.now().toString()
        //             }
        //             while(true) {
        //                 let token = randomBytes(16).toString('hex');
        //                 if (!sessions.has(token)) {
        //                     sessions.set(token, session)
        //                     res.send(token)
        //                     break
        //                 }
        //             }
        //         }
        //         else {
        //             console.log(("[FAILED] password invalid"))
        //             res.status(401)
        //             res.send("invalid password")
        //             }
        //         }
        //     )
        // }
        // else {
        //     res.status(401).send("invalid user")
        // }
    });
}
exports.createSession = createSession;
//# sourceMappingURL=createSession.js.map