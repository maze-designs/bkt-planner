"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_1 = __importDefault(require("./v1"));
const { createProxyMiddleware } = require('http-proxy-middleware');
// proxy middleware options
/** @type {import('http-proxy-middleware/dist/types').Options} */
const options = {
    target: 'http://localhost:5500/dashboard',
    changeOrigin: false, // needed for virtual hosted sites
};
const proxy = createProxyMiddleware(options);
const app = (0, express_1.default)();
const port = process.env.PORT || 6969;
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());
app.use('/', express_1.default.static('frontend'));
app.use('/api/v1', v1_1.default);
// app.get('/', (req: any, res: any) => res.send('server up'))
app.listen(port, () => console.log(`up @${port}`));
//# sourceMappingURL=index.js.map