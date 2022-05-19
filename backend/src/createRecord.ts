import { sessions, records } from './db';
import colors from 'colors/safe';

export async function createRecord(req: any, res: any) {
    console.log(req.body.session)
    if (sessions.has(req.body.session)) {
        let user = sessions.get(req.body.session).user
        console.log(user)
        let record = {
            user: user,
            addedDate: Date.now().toString(),
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            tags: req.body.tags,
            name: req.body.name,
            description: req.body.description
        }
        records.set("", record)
                res.status(200).send("added record") //TODO: add record to db
    }
    else res.status(401).send("Invalid session")

}

