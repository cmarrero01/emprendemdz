/**
 * Controller for user
 *
 * @module _Rest
 * @submodule user
 * @author Claudio A. Marrero
 * @class _Rest.user
 */
'use strict';
module.exports = function(params){

    if(!params.Rest){
        return;
    }

    var template = require('../libs/rest_template.js')(params,'user',params.Rest.user_model);

    return (function(){

        /**
         * Initialization method for leaderboard actions.
         * @method init
         */
        function init(){
            //This is for permit an override the response public methods before the router call the methods.
            template.init();
        }


        return {
            init:init
        };
    })();
};