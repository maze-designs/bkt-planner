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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const db_js_1 = require("../../src/db.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = require("crypto");
function createSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (db_js_1.users.has(req.body.username)) {
            bcrypt_1.default.compare(req.body.password, db_js_1.users.get(req.body.username).password, (err, result) => {
                if (result) {
                    console.log((`[OK] password for ${req.body.username} valid`));
                    let session = {
                        "user": req.body.username,
                        "expires": new Date().setDate(new Date().getDate() + 14),
                        "created": Date.now().toString()
                    };
                    while (true) {
                        let token = (0, crypto_1.randomBytes)(16).toString('hex');
                        if (!db_js_1.sessions.has(token)) {
                            db_js_1.sessions.set(token, session);
                            res.send(token);
                            break;
                        }
                    }
                }
                else {
                    console.log(("[FAILED] password invalid"));
                    res.status(401);
                    res.send("invalid password");
                }
            });
        }
        else {
            res.status(401).send("invalid user");
        }
    });
}
exports.createSession = createSession;
