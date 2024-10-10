require('dotenv').config();
import express, { Request, Response } from 'express'

import cors from 'cors'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { log } from 'console';

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const path = require('path');
const port = process.env.PORT
const uri = process.env.MONGODB;
const serverApi = {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }

app.get('/', async (req: Request, res: Response) => {
    /* 
    req.query: Not used

    req.body: Object
        database: String <= mongoDB database name
        collection: String <= mongoDB collection name

    return: Object
        data: [{any}] <= data from database
    */

    const client = new MongoClient(uri, {serverApi});
    let response = {data: []}
    let data=[]
    const dbName = String(req.query?.database || "Researches")
    const colName =String(req.query.collection || "Websites Research")
    const query = {};
    const options = {};
    
    try {
        const collection = client.db(dbName).collection(colName);
        const cursor = await collection.find();        
        for await (const doc of cursor) {
            data.push(doc)
          }
    } finally {await client.close()}

    res.status(200).send({...response, data})
})


app.post('/', async (req: Request, res: Response) => {
    /* 
    req.query: Not used

    req.body:
        {
            options: Object
                database: String <= mongoDB database name
                collection: String <= mongoDB collection name
            data:
                [{any},]
        }

    return: Not used
    */

    const client = new MongoClient(uri, {serverApi});
    let response = {}
    const data = req.body;
    
    try {
        const collection = client.db(data.options?.db||"Researches").collection(data.options?.collection||"Websites Research");
        
        await collection.insertOne(data);        
    } finally {await client.close()}

    res.status(200).send({...response});
  });

app.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = app;
