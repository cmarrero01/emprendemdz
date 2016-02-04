/**
 * Controller for user
 *
 * @module _Rest
 * @submodule user
 * @author Claudio A. Marrero
 * @class _Rest.user
 */
'use strict';
module.exports = function(params,controller,model){

    return (function rest_template(){

        var response = {};

        /**
         * Get an array of things
         * @param req
         * @param res
         */
        response.get = function get(req,res){

            var query = {};
            var populate = "";
            if(req.query){
                query = req.query;
                if(req.query.populate){
                    populate = req.query.populate;
                    delete query.populate;
                }
            }

            model
                .find(query)
                .populate(populate)
                .exec(function getCb(err,doc){
                    params.Rest.response.http(req,res,err,doc);
                })
        };

        /**
         * Get one thing
         * @param req
         * @param res
         */
        response.show = function show(req,res){
            model
                .findById(req.params.restId)
                .exec(function showCb(err,doc){
                    params.Rest.response.http(req,res,err,doc);
                });
        };

        /**
         * Add things to model
         * @param req
         * @param res
         */
        response.add = function add(req,res){
            model
                .create(req.body[controller],function addCb(err,doc){
                    params.Rest.response.http(req,res,err,doc);
                })
        };

        /**
         * Update by query
         * @param req
         * @param res
         */
        response.update = function update(req,res){

            var query = {};
            if(req.body[controller] && req.body[controller].query){
                query = req.body[controller].query;
            }

            model
                .update(query,{$set:req.body[controller].update},{multi:true},function updateCb(err,doc){
                    params.Rest.response.http(req,res,err,doc);
                })
        };

        /**
         * Update by model id
         * @param req
         * @param res
         */
        response.updateById = function updateById(req,res){
            model
                .findByIdAndUpdate(req.params.restId,{$set:req.body[controller]},function updateByIdCb(err,doc){
                    params.Rest.response.http(req,res,err,doc);
                })
        };

        /**
         * Remove by query
         * @param req
         * @param res
         */
        response.remove = function remove(req,res){

            var query = {};
            if(req.body[controller] && req.body[controller].query){
                query = req.body[controller].query;
            }

            model
                .remove(query,function removeCb(err,doc){
                    params.Rest.response.http(req,res,err,doc);
                })
        };

        /**
         * Remove b y rest ID
         * @param req
         * @param res
         */
        response.removeById = function removeById(req,res){
            model
                .findByIdAndRemove(req.params.restId,function removeByIdCb(err,doc){
                    params.Rest.response.http(req,res,err,doc);
                })
        };

        /**
         * Init Routes for each controller
         */
        response.init = function init(){
            params.app.get('/'+controller+'/get',response.get);
            params.app.get('/'+controller+'/show/:restId',response.show);
            params.app.post('/'+controller+'/add',response.add);
            params.app.post('/'+controller+'/update',response.update);
            params.app.post('/'+controller+'/update/:restId',response.updateById);
            params.app.post('/'+controller+'/remove',response.remove);
            params.app.post('/'+controller+'/remove/:restId',response.removeById);
        };

        return response;
    })();
};