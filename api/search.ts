import express, { Request, Response } from 'express'
import axios from 'axios'

import { MongoClient } from 'mongodb'

import {uri, serverApi, seperConfig} from './config'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    /* 
    req.query:
        query: String       <= search query
        location: String    <= location
    return: Object
        query: String       <= search query
        location: String    <= search location
        results: A[O]       <= results
        places: A[O]        <= places
    */

    const response = {}
    const data = {query: req.query.query, location: req.query.location  || "Silesian Voivodeship, Poland", results:[], places:[]}
    
    const q = JSON.stringify({
    "q": data.query,
    "location": data.location,
    "gl": "pl",
    "hl": "pl",
    "num": 100
    });

    axios({...seperConfig, data:q})
    .then(async r => {
        data.results = r.data.organic
        data.places = r.data.places

        const client = new MongoClient(uri, {serverApi});
        try {
            const collection = client.db("Researches").collection("Websites Research");
            collection.insertOne(data);    
        } finally {await client.close()}

        res.status(200).send({...response, data})
    })
    .catch(error => console.log(error));
})

export default router