"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecord = void 0;
const db_1 = require("./db");
async function getRecord(req, res) {
    console.log(req.body.username);
    db_1.sessions.has(req.body.session) ?
        function () {
            let user = db_1.sessions.get(req.body.session).user;
        } : res.status(401).send("Invalid session");
}
exports.getRecord = getRecord;
//# sourceMappingURL=getRecord.js.map