import express, { Request, Response } from 'express'
import db from './utils/mongodb'

const router = express.Router()


router.get('/test', async (req: Request, res: Response) => {
    const data = await db.find( 
        String(req.query?.database || "Researches"), 
        String(req.query?.collection || "Websites Research")
    )

    res.status(200).send(data)
})


router.post('/test', async (req: Request, res: Response) => {
    db.insertOne(
        String(req.query?.database || "Researches"), 
        String(req.query?.collection || "Websites Research"), 
        req.body
    )

    res.status(200).send({});
  });

  export default router