// packages
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment')
// utils
const Utils = require('../../utils/Utils');
// Database
const DbClass = require('../Db/Db')
const DbInstance = new DbClass()
// services
const Services = require('./Services')



module.exports = class Project {

    constructor(context){
        this.Db = DbInstance.Db
        this.context = context
    }

    async create(){
        try {
            this.context.body.userId = ObjectID(this.context.user._id)
            if(this.context.body.projectId)
                this.context.body.projectId = ObjectID(this.context.body.projectId)
            const result = await Utils.insertOne(this.Db, 'tasks', this.context.body);
            return {code: 1, message: "Create tasks success!!", user: result.ops[0]};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async update(){
        try {
            let data = this.context
            const result = await Utils.findOneAndUpdate(this.Db, 'tasks', data.body, data.params._id);
            return {code: 1, message: "Create tasks success!!", user: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async list(){
        try {
            const result = await Utils.listWithPagination(this.Db, 'tasks', this.context);
            return {code: 1, message: "List tasks success!!", tasks: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    
    async startTask(){
        try {
            let data = this.context, result = ""
            let validation = await Services.validateDidStartTaks(this.Db, data.body.taskId)
            if(validation){               
                result = await Utils.findOneAndUpdate(this.Db, 'tasks', { start: data.body.start }, data.body.taskId);
            }
            return {code: 1, message: "Started tasks success!!"};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async stopTask(){
        try {
            let { body } = this.context, result = ""
            // add task time
            let dataTaskTime = body
            dataTaskTime.taskId = ObjectID(dataTaskTime.taskId)
            dataTaskTime.stop = new Date(dataTaskTime.stop)
            dataTaskTime.start = new Date(dataTaskTime.start)
            const durationTaskTimes = moment(body.stop).diff(body.start, 'seconds')
            dataTaskTime.duration = Services.secondsToHms(durationTaskTimes)
            const taskTime = await Utils.insertOne(this.Db, 'taskTimes', dataTaskTime);
            // Query de time start task
            const task = await this.Db.collection('tasks').findOne({ _id: ObjectID(body.taskId) }, {w:'majority'});
            // Calculate duration between start time and last stop time
            const durationTask = moment(body.stop).diff(task.start, 'seconds')
            let durationTotal = Services.secondsToHms(durationTask)
            // update tasks with duration tasks
            result = await this.Db.collection('tasks').findOneAndUpdate(
                {_id: ObjectID(body.taskId)},
                {
                    $set: { stop: body.stop, duration: durationTotal },
                    $push: { taskTimesId: taskTime.ops[0]._id }
                },
                {w: 'majority'}
                )
            return {code: 1, message: "Stoped tasks success!!"};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

}