// packages
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment')
const _ = require('lodash')
// utils
const Utils = require('../../utils/Utils');
// services
const Services = require('./Services')

module.exports = class Project {

    constructor(context){        
        this.context = context
    }

    async create(){
        try {
            let { clientId, usersId } = this.context.body
            if(clientId)  
                this.context.body.clientId = ObjectID(clientId)
            if(usersId){
                this.context.body.usersId = _.map(usersId, (_id) => {
                    return ObjectID(_id)
                })
            }
            const result = await Utils.insertOne('projects', this.context.body);
            return {code: 1, message: "Create project successfully!!", data: result.ops[0]};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async update(){
        try {
            let data = this.context
            if(data.usersId){
                data.usersId = _.map(usersId, (_id) => {
                    return ObjectID(_id)
                })
            }
            const result = await Utils.findOneAndUpdate('projects', data.body, data.params._id);
            return {code: 1, message: "Update project successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async list(){
        try {
            const result = await Utils.listWithPagination('projects', this.context);
            return {code: 1, message: "List projects successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async delete(){
        try {
            const result = await Utils.deleteOne('projects', this.context.params._id);
            return {code: 1, message: "Deleted project successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

}