import {q, client} from './db'

export async function getUserRefFromUsername(user: string) {
    type userRef = {
        ref: {
            value: {
                id: string
            }
        }
    }
    const userRef: userRef = await client.query(q.Get(q.Match(q.Index('users_by_username'), user)))
    return userRef.ref.value.id
}

export async function removeSession(sessionId: string) {
    type ref = {
        ref: {
            value: {
                id: string
            }
        }
    }
    const ref: ref = await client.query(q.Get(q.Match(q.Index("sessions_by_id"), sessionId)))

    client.query(q.Update(q.Ref(q.Collection('sessions'), ref.ref.value.id), {
        data: {
            expires: new Date().setDate(new Date().getDate() + 14)
        }
    }))
}

export async function renewSession(sessionId: string) {
    //TODO:
}
export async function getUserRefFromSession(session: string) {

        //TODO: unfinished
    await client.query(q.Get(q.Match(q.Index('sessions'), session)))

}

export async function validateSession(session: string, username: string) {
    type sessionExpires = {
        data: {
            expires: number
        }
    }
    console.log(`${session} ${username}`)
    const res: sessionExpires = await client.query(q.Get(q.Match(q.Index('sessions'), session, username)))
    const expires = res.data.expires
    if (expires > Date.now()) {
        return true
    }
    else {
        return false

    }
}