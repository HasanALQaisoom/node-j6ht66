const { MongoClient } = require('mongodb');

module.exports = {
  connectToDb: (cd) => {
    MongoClient.connect(
      'mongodb+srv://COE453-test:hIvqQFtNVvwatX2M@cluster0.mme6feq.mongodb.net/?retryWrites=true&w=majority'
    )
      .then((client) => {
        dbConnection = client.db();
        return cd();
      })
      .catch((err) => {
        console.log(err);
        return cd(err);
      });
  },
  getDb: () => dbConnection,
};
