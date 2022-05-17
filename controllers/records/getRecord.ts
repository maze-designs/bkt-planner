import { sessions, records } from '../../src/db.js';
import colors from 'colors/safe';



export async function getRecord(req: any, res: any) {

    console.log(req.body.username)
    sessions.has(req.body.session) ?
    function () {
        let user = sessions.get(req.body.session).user
                
    } : res.status(401).send("Invalid session")


}

