import { MongoClient } from 'mongodb'

import {uri, serverApi, seperConfig} from '../config'

const insertOne = (db: string, col: string, data: Object) => {
    const client = new MongoClient(uri, {serverApi});
    try {
        const collection = client.db(db).collection(col);
        collection.insertOne(data);    
    }
    catch   {error => console.log(error)}
    finally {client.close()}
}

const find = async (db: string, col: string) => {
    const client = new MongoClient(uri, {serverApi});
    const data=[]

    try {
        const collection = client.db(db).collection(col);
        const cursor = await collection.find();        
        for await (const doc of cursor) {
            data.push(doc)
        }
    }
    catch   {error => console.log(error)}
    finally {await client.close()}

    return data
}


export default {insertOne, find}