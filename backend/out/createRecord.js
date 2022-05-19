"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecord = void 0;
const db_1 = require("./db");
async function createRecord(req, res) {
    console.log(req.body.session);
    if (db_1.sessions.has(req.body.session)) {
        let user = db_1.sessions.get(req.body.session).user;
        console.log(user);
        let record = {
            user: user,
            addedDate: Date.now().toString(),
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            tags: req.body.tags,
            name: req.body.name,
            description: req.body.description
        };
        db_1.records.set("", record);
        res.status(200).send("added record"); //TODO: add record to db
    }
    else
        res.status(401).send("Invalid session");
}
exports.createRecord = createRecord;
//# sourceMappingURL=createRecord.js.map