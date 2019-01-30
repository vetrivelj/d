'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
var https = require('https');
var fs = require('fs'),
    path = require('path');
restService.use(bodyParser.urlencoded({
    extended: true
}));
restService.use(bodyParser.json());

var Input,Output,Webservice; 
var Invoke = require("./invoker");
var SendResponse = require("./sendResponse");

var intentName = "";

var qString = "";

var speech = "";
var speechText = "";
var suggests = [];
var contextOut = [];

var anaConfig;
var listConfig = [ {
        "invoke" : ["input", "webservice", "output"],
        "intent" : ["JDE_creditlimit", "JDE_creditlimit_name"],
        "webservice" : {
            user: 'viki',
            password: 'Oracle123',
            server: 'vikisql.c1abev5luwmn.us-west-1.rds.amazonaws.com',
            database: 'viki'
           },
	   "folder" : "ana"
    },{
        "invoke" : ["input", "webservice", "output"],
        "intent" : ["test"],
        "webservice" : {
            user: 'viki',
            password: 'Oracle123',
            server: 'vikisql.c1abev5luwmn.us-west-1.rds.amazonaws.com',
            database: 'viki'
           },
	   "folder" : "ana"
    }
];

restService.post('/inputmsg', function(req, res) {
	intentName = req.body.result.metadata.intentName
    for(var i =0; i < listConfig.length; i ++){
        if( listConfig[i].intent.includes(intentName) ){
            anaConfig = listConfig[i];
            break;
        }
    }
	Invoke( 0, 1, anaConfig, req, res, function(){
        console.log("Done");
    });
});


restService.listen((process.env.PORT || 9000), function() {
    console.log("Server up and listening");
});