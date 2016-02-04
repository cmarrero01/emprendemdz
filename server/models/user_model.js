/**
 * ground Model Schema
 * @module _Rest
 * @submodule ground_model
 * @author Claudio A. Marrero
 * @class _Rest.ground_model
 */
'use strict';
module.exports = function(params){

    if(!params.Rest){
        return;
    }

    /**
     * A Schema for ground
     * @property schema
     * @type {Mongoose.Schema}
     * @private
     */
    var schema = new params.mongoose.Schema({
        "user":{type: params.mongoose.Schema.Types.ObjectId, ref: 'user'},
        "name":{type: String, required:true},
        "email":{type: String, required: true},
        "password":{type: String, required: true},
        "plan":{type: params.mongoose.Schema.Types.ObjectId, ref: 'plan'},
        "role":{type: params.mongoose.Schema.Types.ObjectId, ref: 'role'},
        "dni":{type: String},
        "address":{type: String},
        "state":{type: String},
        "phone":{type: String},
        "price":{type: Number},
        "specialties":[String],
        "healthInsurance":[String],
        "description":{type: String},
        "atention":{
            "monday":[{
                "from": {type: Date},
                "to": {type: Date}
            }],
            "tuesday":[{
                "from": {type: Date},
                "to": {type: Date}
            }],
            "wednesday":[{
                "from": {type: Date},
                "to": {type: Date}
            }],
            "thursday":[{
                "from": {type: Date},
                "to": {type: Date}
            }],
            "friday":[{
                "from": {type: Date},
                "to": {type: Date}
            }],
            "saturday":[{
                "from": {type: Date},
                "to": {type: Date}
            }],
            "sunday":[{
                "from": {type: Date},
                "to": {type: Date}
            }]
        },
        "createAt": {type: Date, default: new Date(Date.now())}
    });

    return params.mongoose.model('user', schema, 'user');
};