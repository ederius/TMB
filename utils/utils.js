const moment = require('moment-timezone');
const ObjectID = require('mongodb').ObjectID;

  exports.insertOne = (collection, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        data = Object.assign(data, {createdAt: new Date(moment().format()), updatedAt: new Date(moment().format())});
        const result = await global.Db.collection(collection).insertOne(data, {w: 'majority'});
        resolve(result);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  exports.findOneAndUpdate = (collection, data, _id) => {
    return new Promise(async (resolve, reject) => {
      try {
        data.updatedAt = new Date(moment().format());
        const result = await global.Db.collection(collection).findOneAndUpdate(
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

  exports.listWithPagination = (collection, data, where = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { pageNumber, elementsNumber } = data.query
        pageNumber = parseInt(pageNumber); elementsNumber = parseInt(elementsNumber);
        let skip = (pageNumber - 1) * elementsNumber
        let limit = elementsNumber
        const result = await global.Db.collection(collection)
          .find(where,{w: 'majority'})
          .skip(skip)
          .limit(limit)
          .sort({createdAt:-1})
          .toArray();
        const registersNumber = await global.Db.collection(collection).count({},{w: 'majority'})
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

  exports.deleteOne = (collection, _id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await global.Db.collection(collection).deleteOne({_id: ObjectID(_id)}, {w: 'majority'});
        resolve(result);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

