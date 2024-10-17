import express, { Request, Response } from 'express'
import axios from 'axios'

import db from '../utils/mongodb'

import {seperConfig} from '../config'

const router = express.Router()

router.post('/stage1', async (req: Request, res: Response) => {
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

    const data = {
        stage: 1,
        query: req.query.query, 
        location: req.query.location  || "Silesian Voivodeship, Poland", 
        results:[], 
        places:[]
    }
    
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
        db.insertOne("Researches", "Websites Research", data)
        res.status(200).send(data)
    })
    .catch(error => console.log(error))
})

router.get('/', async (req: Request, res: Response) => {
    /*
    return: all Researches.WebsiteResearch
    */
    const data = await db.find("Researches", "Websites Research")
    res.status(200).send(data);
})

export default router