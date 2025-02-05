import { MongoClient } from "mongodb"


export async function connectDatabase(){
    const client = await MongoClient.connect('mongodb+srv://<username>:<password>@cluster0.qkuse.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=Cluster0')
    return client
}

export async function insertDocuments(client, collection, document){
    // Setup a connection 
    const db = client.db()
    const result = await db.collection(collection).insertOne(document)
    return result
}

export async function getAllDocuments(client, collection, sort){
    const db = client.db()
    const documents = await db.collection(collection).find().sort(sort).toArray()
    return documents
}
