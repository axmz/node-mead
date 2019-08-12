const {
  MongoClient,
  ObjectID
} = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const database = 'node-tasks';

MongoClient.connect(connectionURL, {
  useNewUrlParser: true
}, (error, client) => {
  if (error) {
    return console.log('Something is wrong');

  }

  const db = client.db(database);
  // console.log('all good');
  // db.collection('users').insertOne({
  //   name: 'alex2',
  //   age: '28'
  // })

  // db.collection('users').updateOne({
  //   _id: new ObjectID("5ca661766e9b6e0c419aa36e")
  // }, {
  //   $set: {
  //     name: "Alexandr"
  //   }
  // }).then().catch();

  // db.collection('tasks').insertMany([{
  //     description: 'buy food',
  //     completed: false
  //   }, {
  //     description: 'do laundry',
  //     completed: false
  //   }, {
  //     description: 'finish paiting',
  //     completed: false
  //   }])
  //   .then(result => console.log('done', result))
  //   .catch(error => console.log('some error', error));

  // db.collection('tasks').updateOne({
  //   _id: new ObjectID('5cad0e99cb750c3dc20214cb')
  // }, {
  //   $set: {
  //     description: 'do laundry tomorrow'
  //   }
  // }).then(result => console.log(result))

  db.collection('tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  }).then(res => console.log(res)).catch(err => console.log(err));
})