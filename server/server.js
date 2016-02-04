/**
* Main Class Rest
* @module _Rest
* @author Claudio A. Marrero
* @class _Rest
* @main Rest
*/
process.env.NODE_ENV = "dev";
var Debug = require('./config/debug.js')(null);

'use strict';
var Rest = (function(){

  	/**
	* Driver for mongodb
	* @property _mongoose
	* @type {Object}
	* @private
	*/
	var _mongoose = require('mongoose');

	/**
	* Validate module for schems of mongoose
	* @property _validate
	* @type {Object}
	* @private
	*/
	var _validate = require('mongoose-validate');

	/**
	* File Helper module
	* @property _fs
	* @type {Object}
	* @private
	*/
	var _fs = require('fs');

    /**
     * Paht handler
     * @type {exports}
     * @private
     */
	var _path = require('path');


	/**
	 * Mailer module, usefull for send emails only
	 * @property _eMails
	 * @type {Object}
	 * @private
	 */
	var _nodemailer = require('nodemailer');
	var _smtpPool = require('nodemailer-smtp-pool');
	var _emailhbs = require('nodemailer-express-handlebars');
	var _hbs = require('express-handlebars');

	var MAIL_CONSTANTS = require('./config/email')({nodemailer: _nodemailer, smtpPool: _smtpPool, emailhbs: _emailhbs, hbs: _hbs});

	/**
	* A list of modules that need to load before everything
	* @property _InitLoad
	* @type {Object}
	* @private
	*/
	var _InitLoad = ['./config/'];

	/**
	* A main object that have all modules, controlers, models, etc.
	* @property _Rest
	* @type {Object}
	* @private
	*/
	var _Rest = null;

	/**
	* Express module to public some endpoints from http
	*
	* @property _express
	* @type {Object}
	* @private
	*/
	var _express = require('express');

	/**
	* Express module to public some endpoints from http
	*
	* @property _bodyParser
	* @type {Object}
	* @private
	*/
	var _bodyParser = require('body-parser');

	/**
	* Instance of express
	*
	* @property _app
	* @type {Object}
	* @private
	*/
	var _app = _express();

	/**
	 * Basic autentication.
	 * @type {auth|exports|module.exports}
	 * @private
	 */
	var _auth = require('basic-auth');

    /**
     * Underscore
     * @property _
     * @type {_|exports}
     * @private
     */
    var _ = require('underscore');

    var cons    = require('consolidate');

    var hogan = require('hogan.js');

    var server = require('http').Server(_app);
    var _io = require('socket.io')(server);

    _app.engine('html', cons.hogan);
    _app.set('view engine', 'html');

    _app.use(_bodyParser.urlencoded({extended: false}));
    _app.use(_bodyParser.json());

	_app.use("/",_express.static("../web"));

    //var _cors = require('cors');
    //_app.use(_cors());
    //
    //_app.use(function(req, res, next) {
		//var credentials = _auth(req);
		//if (!credentials || credentials.name !== 'deturnos' || credentials.pass !== '2015$') {
		//	res.statusCode = 401;
		//	res.set('WWW-Authenticate', 'Basic realm="example"');
		//	res.end('Access denied');
		//	return;
		//}
    //    next();
    //});
    server.listen(8000);

	/**
	* This method make the initialization of all yapp server,
	* Makes a load of all modules and shot the connection to mongodb
	*
	* @method init
	* @example Rest.init();
	*/
	function init(){

		var _params = {
            _:_,
			mongoose:_mongoose,
			validate:_validate,
			fs:_fs,
			path:_path,
			load:_InitLoad,
			app:_app,
			express:_express,
            io:_io,
			debug:Debug.debug,
			nodemailer    : _nodemailer,
			emailhbs      : _emailhbs,
			smtpPool      : _smtpPool,
			hbs           : _hbs,
			CONSTANTS     : {
				MAIL_CONSTANTS          : MAIL_CONSTANTS
			}
		};

		var _loader = require('./load.js')(_params);
		_Rest = _loader.init();
		_Rest.deph = _params;

		connect();
	}

	/**
	* Make a connection to the database,
	*
	* @method connect
	* @example connect();
	*/
	function connect(){
		if(!_Rest){
			console.log('_Rest is null');
			return;
		}
		_mongoose.connect(_Rest.database.servers.connectString,_Rest.database.db,function(err) {
			if(err) throw err;
			_Rest.user.init();
		});
	}

	return {
		init:init
	};
	
})();

Rest.init();