"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const safe_1 = __importDefault(require("colors/safe"));
// Set default permissions unless they already exist/were changed
if (!db_1.perms.has("$options")) {
    db_1.perms.set("$options", ["all", "owns"]);
    console.log("[SET] perms: options");
}
if (!db_1.perms.has("admin")) {
    db_1.perms.set("admin", {
        "read": "all",
        "write": "all"
    });
    console.log("[SET] perms: admin");
}
if (!db_1.perms.has("user")) {
    db_1.perms.set("user", {
        "read": "all",
        "write": "owns"
    });
    console.log("[SET] perms: user");
}
if (!db_1.users.has("admin")) {
    db_1.users.set("admin", {
        "displayName": "admin",
        "password": "admin",
        "sessions": [],
        "perms": "admin"
    });
}
// TODO: Set default config unless it already exists/was changed
// useless but creates the files
db_1.records.set("");
db_1.sessions.set("");
db_1.config.set("");
console.log(safe_1.default.green("[READY] dbs"));
