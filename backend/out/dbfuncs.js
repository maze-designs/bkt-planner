"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = exports.getUserRefFromSession = exports.renewSession = exports.removeSession = exports.getUserRefFromUsername = void 0;
const db_1 = require("./db");
async function getUserRefFromUsername(user) {
    const userRef = await db_1.client.query(db_1.q.Get(db_1.q.Match(db_1.q.Index('users_by_username'), user)));
    return userRef.ref.value.id;
}
exports.getUserRefFromUsername = getUserRefFromUsername;
async function removeSession(sessionId) {
    const ref = await db_1.client.query(db_1.q.Get(db_1.q.Match(db_1.q.Index("sessions_by_id"), sessionId)));
    db_1.client.query(db_1.q.Update(db_1.q.Ref(db_1.q.Collection('sessions'), ref.ref.value.id), {
        data: {
            expires: new Date().setDate(new Date().getDate() + 14)
        }
    }));
}
exports.removeSession = removeSession;
async function renewSession(sessionId) {
    //TODO:
}
exports.renewSession = renewSession;
async function getUserRefFromSession(session) {
    //TODO: unfinished
    await db_1.client.query(db_1.q.Get(db_1.q.Match(db_1.q.Index('sessions'), session)));
}
exports.getUserRefFromSession = getUserRefFromSession;
async function validateSession(session, username) {
    console.log(`${session} ${username}`);
    const res = await db_1.client.query(db_1.q.Get(db_1.q.Match(db_1.q.Index('sessions'), session, username)));
    const expires = res.data.expires;
    if (expires > Date.now()) {
        return true;
    }
    else {
        return false;
    }
}
exports.validateSession = validateSession;
//# sourceMappingURL=dbfuncs.js.map