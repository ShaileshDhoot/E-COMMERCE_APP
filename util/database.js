const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://shaileshdhoot:NDse6wRHdZBhKgrf@cluster0.ojw2csb.mongodb.net/?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db()
      callback(client);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDB = ()=>{
  if(_db){
    return _db;
  }else{
    throw 'no DB found'
  }
}

exports.mongoConnect = mongoConnect
exports.getDB = getDB
