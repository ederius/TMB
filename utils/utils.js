const moment = require('moment-timezone');
const timestamp = moment().tz('America/Bogota');
const ObjectID = require('mongodb').ObjectID;
const config = require('./../configurations/config')[process.env.NODE_ENV];

  exports.insertOne = (Db, collection, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        data = Object.assign(data, {createdAt: new Date(timestamp.format()), updatedAt: new Date(timestamp.format())});
        const result = await Db.collection(collection).insertOne(data, {w: 'majority'});
        resolve(result);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  exports.findOneAndUpdate = (Db, collection, data, _id) => {
    return new Promise(async (resolve, reject) => {
      try {
        data.updatedAt = new Date(timestamp.format());
        const result = await Db.collection(collection).findOneAndUpdate(
            {_id: ObjectID(_id)},
            {$set: data},
            {w: 'majority'}
        );
        resolve(result);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  exports.listWithPagination = (Db, collection, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { pageNumber, elementsNumber } = data.query
        pageNumber = parseInt(pageNumber); elementsNumber = parseInt(elementsNumber);
        let skip = (pageNumber - 1) * elementsNumber
        let limit = elementsNumber
        const result = await Db.collection(collection)
          .find({},{w: 'majority'})
          .skip(skip)
          .limit(limit)
          .sort({createdAt:-1})
          .toArray();
        const registersNumber = await Db.collection(collection).count({},{w: 'majority'})
        resolve({
          data:result, 
          registersNumber: registersNumber,
          pagesNumber: registersNumber / elementsNumber <= 1 ? 1 : Math.ceil(registersNumber / elementsNumber),
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

