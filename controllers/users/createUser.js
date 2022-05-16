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
exports.createUser = void 0;
const db_js_1 = require("../../src/db.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const safe_1 = __importDefault(require("colors/safe"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(req)
        console.log(req.body.username);
        // res.send('apiv1: createUser')
        yield bcrypt_1.default.hash(req.body.password, 10, (err, hash) => {
            if (!db_js_1.users.has(req.body.username)) {
                let data = {
                    "displayName": req.body.displayName,
                    "password": hash,
                    "sessions": [],
                    "perms": "user"
                    // TODO: add more data?
                };
                db_js_1.users.set(req.body.username, data);
                db_js_1.users.set();
                res.send('user created');
            }
            else {
                console.log(safe_1.default.red(`[FAILED] user ${req.body.username} already exists`));
                res.send('user already exists');
                // TODO: throw error
            }
        });
    });
}
exports.createUser = createUser;
