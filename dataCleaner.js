
var message = require('./Message')

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var tables = [
    message.tableDef
]

tables.forEach(function(table, index, array) {
    console.log("delete table name = " + table.TableName);
    var params = {
        TableName : `${table.TableName}`
    }
    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
})
