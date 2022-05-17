"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessions = exports.perms = exports.config = exports.records = exports.users = exports.client = exports.q = void 0;
const JSONdb = require('simple-json-db');
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const faunadb_1 = __importDefault(require("faunadb"));
const faunaKey = (_a = process.env.FAUNA_KEY) !== null && _a !== void 0 ? _a : '';
if (!faunaKey) {
    console.log('error: FAUNA_KEY not set (.env)');
    process.exit(1);
}
// EXPORTS:
exports.q = faunadb_1.default.query;
exports.client = new faunadb_1.default.Client({
    secret: faunaKey,
    domain: 'db.eu.fauna.com',
    port: 443,
    scheme: 'https',
});
exports.client.query(exports.q.Create(exports.q.Collection("users"), {
    data: {
        "deptno": 10,
        "dname": "ACCOUNTING",
        "loc": "NEW YORK"
    }
}));
exports.users = new JSONdb(path_1.default.join("./db-users.json"));
exports.records = new JSONdb(path_1.default.join("./db-records.json"));
exports.config = new JSONdb(path_1.default.join("./db-config.json"));
exports.perms = new JSONdb(path_1.default.join("./db-perms.json"));
exports.sessions = new JSONdb(path_1.default.join("./db-sessions.json"));
