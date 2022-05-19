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
exports.createRecord = void 0;
const db_js_1 = require("../../src/db.js");
function createRecord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body.session);
        if (db_js_1.sessions.has(req.body.session)) {
            let user = db_js_1.sessions.get(req.body.session).user;
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
            db_js_1.records.set("", record);
            res.status(200).send("added record"); //TODO: add record to db
        }
        else
            res.status(401).send("Invalid session");
    });
}
exports.createRecord = createRecord;
//# sourceMappingURL=createRecord.js.map