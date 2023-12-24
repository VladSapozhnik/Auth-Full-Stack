const { MongoClient } = require('mongodb');


const url = process.env.mongoURL || 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url);

const dbName = 'Users';
let database;

const runDB = async () => {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    await client.db(dbName).command({ping: 1});
    database = await client.db(dbName);

    // const collection = db.collection('auth');
    // const query = { username: 'username' };
    // const movie = await collection.findOne(query);
    // console.log(movie)

    // const auth = await database.collection('auth');
    // const query = { username: 'username' };
    // const movie = await auth.findOne(query);
    // console.log(movie)

    // const movies = database.collection('auth');
    // Query for a movie that has the title 'Back to the Future'
    // const query = { username: 'username' };
    // const movie = await movies.findOne(query);
    // console.log(movie)

  } catch (e) {
    await client.close();
  }
}

module.exports = {
  runDB: runDB,
  client: client
}