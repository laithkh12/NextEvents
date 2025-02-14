// /api/comments/some-id

import { insertDocuments, connectDatabase, getAllDocuments } from "../../../helpers/db-util"

async function handler(req, res){

    const eventId = req.query.eventId

    let client

    try {
        // create connection
        client = await connectDatabase()
    } catch (error) {
        res.status(500).json({message: 'Connection failed'})
        return
    }

    if(req.method === 'POST'){
        // add server side validation
        const {email, name, text} = req.body
        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
            res.status(422).json({message:'Invaled input'})
            client.close()
            return
        }
        
        const newComment = {
            email,
            name,
            text,
            eventId,
        }
        let result 

        try {
            result = await insertDocuments(client, 'comments', newComment)
            newComment._id = result.insertedId
            res.status(201).json({message:'Comment added.', comment: newComment})
        } catch (error) {
            res.status(500).json({message: 'Inserting comment failed'})
        }
    }

    if(req.method === 'GET'){
        try {
            const documents = await getAllDocuments(client, 'comments', {_id: -1})
            res.status(200).json({comments: documents})
        } catch (error) {
            res.status(500).json({message: 'Getting comments failed'})
        }
    }

    client.close()
}

export default handler
