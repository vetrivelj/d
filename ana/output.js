module.exports = function(response, anaConfig, req, res, level, callback) {
    var CustNum = req.body.result.parameters.CustNum;
    var CustName = req.body.result.parameters.CustName;

    var Webservice = require("./webservice");
    var SendResponse = require("../sendResponse");
    var Output = require("./output")

    var qString = "";
    var speech = "";
    var speechText = "";
    var suggests = [];
    var contextOut = [];

    var shortName = "";

    if (response.rowsAffected == 0) {
        if (CustName != "" && CustName != null) {
            shortName = CustName.substr(0, (CustName.length) / level);
            if (shortName > 2) {
                qString = "Select * from jde WHERE CustName  LIKE '" + shortName + "%' OR REPLACE(REPLACE(REPLACE(CustName, '.',''), ',', ''), '/', '') LIKE '" + shortName + "%'";
                Webservice(qString, anaConfig, req, res, function(resultWeb1) {
                    Output(resultWeb1, anaConfig, req, res, level + 1, function(resultOut) {
                        console.log("Result Out : + " + resultOut);
                    });
                });
            } else {
                speechText = "No record found.";
                speech = speechText;
                SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                    console.log("Finished!");
                });
            }
        } else {
            speechText = "No record found.";
            speech = speechText;
            SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                console.log("Finished!");
            });
        }
    } else {
        if (response.rowsAffected == 1) {
            speechText = "Credit limit for " + response.recordset[0].CustName + "(" + response.recordset[0].CustNum + ") is " + response.recordset[0].credit;
        } else {
            speechText = "Please select one of the following:\n";
            speechText += "Customer ";
            suggests = [];
            for (var i = 0; i < response.recordset.length; i++) {
                speechText += response.recordset[i].CustNum + " : " + response.recordset[i].CustName + ",\n";
                suggests.push({
                    "title": "" + response.recordset[i].CustNum
                });
            }
        }
        speech = speechText;
        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
            console.log("Finished!");
        });
    }
}