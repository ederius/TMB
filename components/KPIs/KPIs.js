// packages
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment')
// utils
const Utils = require('../../utils/utils');
// services
const Services = require('./Services')

module.exports = class KPIs {

    constructor(context){        
        this.context = context
    }

    async KPIProjects(){
        try {
            const result = await Services.KPIProjects();
            return {code: 1, message: "Get KPI successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

    async KPIUser(){
        try {
            const result = await Services.KPIUser();
            return {code: 1, message: "Get KPI successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }


    async KPIUsersByProject(){
        try {
            const result = await Services.KPIUsersByProject(this.context);
            return {code: 1, message: "Get KPI successfully!!", data: result};
        } catch (errors) {
            console.log(errors);
            return {code: 0, message: Messages.serverError, errors};
        }
    }

}