const config = require('../../configurations/config')[process.env.NODE_ENV];
const MongoClient = require('mongodb').MongoClient;
const test = require('assert');

const configDB = config.database;

module.exports = class Db {
  constructor() {
    this.Db = ''; this.client = '';
    try {
      if (process.env.NODE_ENV === 'production') {
        this.url = `mongodb+srv://${configDB.username}:${configDB.password}@${configDB.uri}`;
      } else if (process.env.NODE_ENV === 'QA') {
        this.url = `mongodb+srv://${configDB.username}:${configDB.password}@${configDB.uri}`;
      } else if (process.env.NODE_ENV === 'development') {
        this.url = `mongodb+srv://${configDB.username}:${configDB.password}@${configDB.uri}`;
      }
      MongoClient.connect(this.url, {useNewUrlParser: true}, (err, client) => {
        this.client = client;
        this.Db = client.db('TMB');        
      });
    } catch (error) {

    }
  }

  async close(client) {
    return new Promise((resolve, reject) => {
      try {
        this.client.close();
        console.log('- Cluster mongo atlas connection closed -');
        resolve({code: 1, response: 'ok'});
      } catch (error) {
        console.log(error);
        reject({code: 0, response: 'error', error});
      }
    });
  }
};
