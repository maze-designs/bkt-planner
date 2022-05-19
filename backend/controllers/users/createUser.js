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
function userExists(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_js_1.client.query(db_js_1.q.Exists(db_js_1.q.Match(db_js_1.q.Index('users_by_username'), username)));
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield userExists(req.body.username))) {
            let hash = yield bcrypt_1.default.hash(req.body.password, 10);
            let data = {
                username: req.body.username,
                "displayName": req.body.displayName,
                "password": hash,
                "perms": "user"
            };
            db_js_1.client.query(db_js_1.q.Create(db_js_1.q.Collection("users"), {
                data: data
            }));
            res.status(200).send("user created");
            // TODO: check if passed
        }
        else {
            res.status(401).send("User already exists");
        }
    });
}
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map