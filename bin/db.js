const mongoose = require('mongoose');
let uri;

if (process.env.NODE_ENV === 'test') {
  uri = 'mongodb://dbUser:dbPass00@ds149732.mlab.com:49732/schoolattendance_test';
} else {
  uri =
    'mongodb://dbUser:dbPass@cluster0-shard-00-00.naqig.mongodb.net:27017,cluster0-shard-00-01.naqig.mongodb.net:27017,cluster0-shard-00-02.naqig.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-tyhn4l-shard-0&authSource=admin&retryWrites=true&w=majority';
}

exports.connectDB = () => {
  var db = mongoose.connection;

  if (db.readyState == 1) {
    return db;
  } else if (db.readyState != 2) {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useFindAndModify: false
    });
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', () => {
      console.log('DB connected!');
    });
  }
  return db;
};
