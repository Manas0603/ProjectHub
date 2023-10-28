import express from 'express';
import dotenv from 'dotenv';
import Router from './routes/routes.js';

import Connection from './database/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));



app.use('/',Router)

dotenv.config();

const PORT=8000;

app.listen(PORT,()=> console.log(`server is running on port ${PORT}`));

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);



