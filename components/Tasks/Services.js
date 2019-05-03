// packages
const ObjectID = require('mongodb').ObjectID;

exports.validateDidStartTaks = async (_id) => {
    _id= ObjectID(_id)
    const task = await global.Db.collection('tasks').findOne({_id}, {w:'majority'});
    return task.start ? false : true ;
}

exports.secondsToHms = (d) => {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);
    if(String(h).length==1)
        h = '0'+String(h)
    if(String(m).length==1)
        m = '0'+String(m)
    if(String(s).length==1)
        s = '0'+String(s)
    return `${h}:${m}:${s}`; 
}

exports.detailsTask = async (_id) => (
    await global.Db.collection('tasks').aggregate([
        {
            '$match': {
                '_id': ObjectID(_id),
            },
        },
        {
            '$lookup': {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
            }
        },
        {
            '$lookup': {
                from: 'taskTimes',
                localField: 'taskTimesId',
                foreignField: '_id',
                as: 'taskTimes',
            }
        },
    ]).toArray()
)