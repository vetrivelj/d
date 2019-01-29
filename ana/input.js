module.exports = function(anaConfig, req, res, callback) {
    var CustNum = req.body.result.parameters.CustNum;
    var CustName = req.body.result.parameters.CustName;

	var qString = "";
	var speech = "";
	
    console.log("Cust Num = " + CustNum + "\nCust Name =" + CustName);
    if ((CustNum == "" || CustNum == null) && (CustName == "" || CustName == null)) {
        speech = "Please provide the Customer name or number."
        res.json({
            speech : speech,
            displayText : speech
        });
    } else {
        if (CustNum == "" || CustNum == null) {
            qString = "Select * from jde WHERE CustName  = '" + CustName + "'";
            callback(qString);
        } else if (CustName == "" || CustName == null) {
            qString = "Select * from jde WHERE CustNum  = " + CustNum;
            callback(qString);
        } else {
            speech = "Unable to process your request. Please try again later.";
            res.json({
                speech : speech,
                displayText : speech
            });
        }
    }
}