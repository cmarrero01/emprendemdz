module.exports = function(params){
    return (function(){

        var response = {};

        /**
         * Manage responses from socket.
         * @param socket
         * @param data
         * @param fn
         * @param err
         * @param doc
         */
        response.socket = function(socket,data,fn,err,doc){
            var res = {
                code:400,
                result:{}
            };
            if(err){
                if (params.debug) {
                    res.result = err;
                    console.log(res);
                }
                res.code = 500;
                res.result = {error: err, data: doc};
                fn(res);
                return;
            }
            res.code = 200;
            res.result = doc;
            try{
                fn(res);
            }catch(e){
                console.log(e);
            }
        };

        response.http = function(req,res,err,result){
            var response = {
                code:400,
                result:{}
            };
            if(err){
                if (params.debug) {
                    response.result = err;
                    console.log(response);
                }
                response.code = 500;
                response.result = {error: err, query: req.query, body: req.body};
                try{
                    res.json(response);
                }catch (e){
                    console.log(e);
                }
                return;
            }
            response.code = 200;
            response.result = result;
            try{
                res.json(response);
            }catch (e){
                console.log(e);
            };
        };

        return response;
    })();
};