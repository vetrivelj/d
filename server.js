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
var SendResponse = require("./sendResponse");

var qString = "";

var speech = "";
var speechText = "";
var suggests = [];
var contextOut = [];

var anaConfig = {
	"intent" : "JDE_creditlimit",
	"webservice" : {
	},
	"folder" : "ana"
};

restService.post('/inputmsg', function(req, res) {
	
	var intentName = req.body.result.metadata.intentName;
	
	if( intentName = anaConfig.intent){
		Input = require("./" + anaConfig.folder + "/input");
		Input( anaConfig, req, res, function(resultIn){
			console.log("Result In: " + resultIn );
            qString = resultIn;
            Webservice = require("./" + anaConfig.folder + "/webservice");
            Webservice( qString, anaConfig, req, res, function(resultWeb){
                console.log("Result Web : " + resultWeb );
                var response = resultWeb;
                Output = require("./" + anaConfig.folder + "/output")
                Output( response, anaConfig, req, res, 1, function(resultOut){
                    console.log("Result Out : + " + resultOut);
                });
            });
            
		});
	}
	
});


restService.listen((process.env.PORT || 9000), function() {
    console.log("Server up and listening");
});
