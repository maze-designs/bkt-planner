"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function userExists(username) {
    return await db_1.client.query(db_1.q.Exists(db_1.q.Match(db_1.q.Index('users_by_username'), username)));
}
async function createUser(req, res) {
    if (!await userExists(req.body.username)) {
        let hash = await bcrypt_1.default.hash(req.body.password, 10);
        let data = {
            username: req.body.username,
            "displayName": req.body.displayName,
            "password": hash,
            "perms": "user"
        };
        db_1.client.query(db_1.q.Create(db_1.q.Collection("users"), {
            data: data
        }));
        res.status(200).send("user created");
        // TODO: check if passed
    }
    else {
        res.status(401).send("User already exists");
    }
}
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map