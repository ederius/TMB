const ObjectID = require('mongodb').ObjectID;

exports.KPIProjects = async () => (
    await global.Db.collection('projects').aggregate([
      {
        '$lookup': {
          'from': 'tasks', 
          'let': {
            'projectId': '$_id', 
            'usersId': '$usersId'
          }, 
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$projectId', '$$projectId'
                  ]
                }
              }
            }
          ], 
          'as': 'tasks'
        }
      }, {
        '$unwind': '$tasks'
      }, {
        '$group': {
          '_id': {
            '_id': '$_id',
            'name': '$name'
          }, 
          'totalSeconds': {
            '$sum': '$tasks.durationInSeconds'
          }
        }
      }
    ]).toArray()
)

exports.KPIUser = async () => (
  await global.Db.collection('users').aggregate([
    {
        '$lookup': {
            'from': 'tasks', 
            'let': {
                'userId': '$_id'
            }, 
            'pipeline': [
                {
                    '$match': {
                        '$expr': {
                            '$eq': [
                                '$userId', '$$userId'
                            ]
                        }
                    }
                }
            ], 
            'as': 'tasks'
        }
    }, {
        '$unwind': '$tasks'
    }, {
        '$group': {
            '_id': {
                '_id': '$_id',
                'name': '$name',
                'email': '$email'
            }, 
            'totalSeconds': {
                '$sum': '$tasks.durationInSeconds'
            }
        }
    }
]).toArray()
)

exports.KPIUsersByProject = async ({ userId, projectId}) => (
  await global.Db.collection('projects').aggregate([
    {
      '$match': {
        '_id': new ObjectID('5ccbd24d939510327235ed87')
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'pipeline': [
          {
            '$match': {
              '_id': new ObjectID('5ccbcc5b7798142f4b05203d')
            }
          }
        ], 
        'as': 'user'
      }
    }, {
      '$unwind': '$user'
    }, {
      '$lookup': {
        'from': 'tasks', 
        'localField': 'user._id', 
        'foreignField': 'userId', 
        'as': 'tasksUser'
      }
    }, {
      '$unwind': '$tasksUser'
    }, {
      '$group': {
        '_id': {
          'projectName': '$name', 
          'userName': '$user.name'
        }, 
        'totalSeconds': {
          '$sum': '$tasksUser.durationInSeconds'
        }
      }
    }
  ]).toArray()
)