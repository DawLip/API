import { MongoClient, ServerApiVersion } from 'mongodb'


const port = process.env.PORT
const uri = process.env.MONGODB;
const serverApi = {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
}

const seperConfig = {
    method: 'post',
    url: 'https://google.serper.dev/search',
    headers: { 
        'X-API-KEY': process.env.SEPERAPI, 
        'Content-Type': 'application/json'
    },
    data : ""
}

export {port, uri, serverApi, seperConfig}