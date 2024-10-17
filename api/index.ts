require('dotenv').config();
import express, { Request, Response } from 'express'
import cors from 'cors'

import db from './mongodb'
import {port} from './config'

import search from './search'

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/search', search)

app.get('/', async (req: Request, res: Response) => {
    /* 
    req.query: Not used
    req.body: Object
        database: String <= mongoDB database name
        collection: String <= mongoDB collection name
    return: Object
        data: [{any}] <= data from database
    */

        const data = db.find( String(req.query?.database || "Researches"), String(req.query?.collection || "Websites Research"))

    res.status(200).send(data)
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

    const data = req.body;
    
    db.insertOne("Researches", "Websites Research", data)


    res.status(200).send({});
  });

app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app
