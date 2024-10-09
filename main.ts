import express from 'express'

import * as dotenv from 'dotenv'
import { log } from 'console'
dotenv.config()

const app = express()
const port = process.env.PORT

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', async (req, res) => {
    let response = {status: "OK"}
    let data=[]
    try {
        const movies = client.db("Researches").collection("Websites Research");
        
        const query = {};
        const options = {};

        const cursor = await movies.find();        
        for await (const doc of cursor) {
            data.push(doc)
          }
    } finally {await client.close()}

    res.send({...response, data})
})

app.post('/users-list', (req, res) => {
    const usersList = req.body;
    
    res.send({
      message: 'New user was added to the list',
    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
