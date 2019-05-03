// packages
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment')
// utils
const Utils = require('../../utils/Utils');
// services
const Services = require('./Services')

module.exports = class KPIs {

    constructor(context){        
        this.context = context
    }

    async KPIProjects(){
        try {
            const result = await Utils.insertOne('KPIs', this.context.body);
            return {code: 1, message: "get KPI successfully!!", data: result.ops[0]};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async KPIUser(){
        try {
            let data = this.context
            const result = await Utils.findOneAndUpdate('KPIs', data.body, data.params._id);
            return {code: 1, message: "Get KPI successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }


    async KPIUsersByProject(){
        try {
            const result = await Utils.listWithPagination('KPIs', this.context);
            return {code: 1, message: "Get KPI successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

}