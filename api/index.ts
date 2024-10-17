require('dotenv').config();
import express, { Request, Response } from 'express'
import cors from 'cors'

import {port} from './config'

import websiteResearchRouter from './websiteResearch/websiteResearch'
import testRouter from './test'

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/test', websiteResearchRouter)
app.use('/website-research', testRouter)

app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app
