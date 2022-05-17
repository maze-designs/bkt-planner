import express from 'express'
import path from 'path'
// import { users, records, config } from './db'
import colors from 'colors/safe'
import apiv1 from '../routes/api/v1'

const app = express()
const port = process.env.PORT || 6969

app.use(require('body-parser').urlencoded({ extended: false }));

app.use('/api/v1', apiv1)
app.get('/', (req: any, res: any) => res.send('server up'))

app.listen(port, () => console.log(`up @${port}`))

//TODO: session management