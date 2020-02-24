import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from '../../template';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', (res, res) => {
    res.statusCode(200).send(Template())
})