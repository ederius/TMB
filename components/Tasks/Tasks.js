// packages
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment')
// utils
const Utils = require('../../utils/Utils');
// services
const Services = require('./Services')

module.exports = class Tasks {

    constructor(context){
        this.context = context
    }

    async create(){
        try {
            this.context.body.userId = ObjectID(this.context.user._id)
            if(this.context.body.projectId)
                this.context.body.projectId = ObjectID(this.context.body.projectId)
            const result = await Utils.insertOne('tasks', this.context.body);
            return {code: 1, message: "Create tasks successfully!!", data: result.ops[0]};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async update(){
        try {
            let data = this.context
            const result = await Utils.findOneAndUpdate('tasks', data.body, data.params._id);
            return {code: 1, message: "Update tasks successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async list(){
        try {
            let where={}
            if(this.context.query.userId)
                where = { userId: ObjectID(this.context.query.userId)}
            const result = await Utils.listWithPagination('tasks', this.context, where);
            return {code: 1, message: "List tasks successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async details(){
        try {
            let _id = ObjectID(this.context.params._id)
            let details = await Services.detailsTask(_id)
            return {code: 1, message: "Get details tasks successfully!!", data: details[0]};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    
    async startTask(){
        try {
            let data = this.context, result = ""
            let validation = await Services.validateDidStartTaks(data.body.taskId)
            if(validation){               
                result = await Utils.findOneAndUpdate('tasks', { start: new Date(data.body.start) }, data.body.taskId);
            }
            return {code: 1, message: "Started tasks successfully!!"};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async stopTask(){
        try {
            let { body } = this.context, result = ""
            // Query time start task
            const task = await global.Db.collection('tasks').findOne({ _id: ObjectID(body.taskId) }, {w:'majority'});
            if(task.start){ // validate if taks have did be started
                let dataTaskTime = body
                dataTaskTime.taskId = ObjectID(dataTaskTime.taskId)
                dataTaskTime.stop = new Date(dataTaskTime.stop)
                dataTaskTime.start = new Date(dataTaskTime.start)
                // duration tasks
                const durationInSecondsNewTime = moment(body.stop).diff(body.start, 'seconds')
                const durationCurrentTask = task.durationInSeconds ? task.durationInSeconds : 0 ;
                const durationInSecondsTotalTask = durationInSecondsNewTime + durationCurrentTask ;
                // duration in h:m:s format
                dataTaskTime.durationHms = Services.secondsToHms(durationInSecondsNewTime)
                dataTaskTime.durationInSeconds = durationInSecondsNewTime
                // save interval tasks
                const taskTime = await Utils.insertOne('taskTimes', dataTaskTime);
                // update tasks with duration tasks
                result = await global.Db.collection('tasks').findOneAndUpdate(
                        {_id: ObjectID(body.taskId)},
                        {
                            $set: { 
                                stop: body.stop, 
                                durationInSeconds: durationInSecondsTotalTask, 
                                updatedAt: new Date(moment().format()) 
                            },
                            $push: { taskTimesId: taskTime.ops[0]._id }
                        },
                        {w: 'majority'}
                    )
                return {code: 1, message: "Stoped tasks successfully!!"};
            }else{
                return {code: 0, message: "uhhs, don't can stop one task that not did be started!!"};
            }
            
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

}