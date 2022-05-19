import express from 'express'
// const cors = require('cors') //NOTE: picovina?
import path from 'path'
// import { users, records, config } from './db'
import colors from 'colors/safe'
import apiv1 from './v1'
const { createProxyMiddleware } = require('http-proxy-middleware');

// proxy middleware options
/** @type {import('http-proxy-middleware/dist/types').Options} */
const options = {
    target: 'http://localhost:5500/dashboard', // target host with the same base path
    changeOrigin: false, // needed for virtual hosted sites
  };

  const proxy = createProxyMiddleware(options);


const app = express()
const port = process.env.PORT || 6969

app.use(require('body-parser').urlencoded({ extended: false }))
app.use(require('body-parser').json())
app.use('/', express.static('frontend'))  

app.use('/api/v1', apiv1)
// app.get('/', (req: any, res: any) => res.send('server up'))

app.listen(port, () => console.log(`up @${port}`))
