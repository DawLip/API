require('dotenv').config();
import express, { Request, Response } from 'express'

import cors from 'cors'
import { MongoClient, ServerApiVersion } from 'mongodb'

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
    let response = {status: "OK", data: []}
    let data=[]
    const client = new MongoClient(uri, {serverApi});

    try {
        const collection = client.db("Researches").collection("Websites Research");
        
        const query = {};
        const options = {};

        const cursor = await collection.find();        
        for await (const doc of cursor) {
            data.push(doc)
          }
    } finally {await client.close()}

    res.send({...response, data})
})


app.post('/', async (req: Request, res: Response) => {
    const data = req.body;
    let response = {status: "OK", data: []}
    const client = new MongoClient(uri, {serverApi});
    
    try {
        const collection = client.db("Researches").collection("Websites Research");
        
        await collection.insertOne(data);        
    } finally {await client.close()}

    res.send(response);
  });

app.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = app;
