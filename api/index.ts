require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.static('public'));

const path = require('path');
const port = process.env.PORT
const uri = process.env.MONGODB;



app.get('/', async (req, res) => {
    let response = {status: "OK"}
    let data=[]
    try {
        const client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
        });

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

app.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = app;
