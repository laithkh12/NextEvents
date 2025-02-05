import { insertDocuments, connectDatabase } from '../../helpers/db-util';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    // Check if email is valid
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    let client;

    try {
      // Try to connect to the database
      client = await connectDatabase();
    } catch (error) {
      console.error('Database connection failed:', error);
      res.status(500).json({ message: 'Connecting to the database failed' });
      return;
    }

    try {
      // Try to insert the email into the database
      const result = await insertDocuments(client, 'newsletter', { email: userEmail });
      console.log('Inserted document result:', result);
      client.close();
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Inserting data failed' });
      return;
    }

    res.status(201).json({ message: 'Signed up' });
  } else {
    // Method Not Allowed (if not a POST request)
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
