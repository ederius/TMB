// packages
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment')
// utils
const Utils = require('../../utils/Utils');
// services
const Services = require('./Services')

module.exports = class Clients {

    constructor(context){        
        this.context = context
    }

    async create(){
        try {
            const result = await Utils.insertOne('clients', this.context.body);
            return {code: 1, message: "Create client successfully!!", data: result.ops[0]};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async update(){
        try {
            let data = this.context
            const result = await Utils.findOneAndUpdate('clients', data.body, data.params._id);
            return {code: 1, message: "Update client successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }


    async list(){
        try {
            const result = await Utils.listWithPagination('clients', this.context);
            return {code: 1, message: "List clients successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

}