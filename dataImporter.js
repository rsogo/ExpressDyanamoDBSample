
var message = require('./Message')

var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var tables = [
    message.tableDef
]

tables.forEach(function(table, index, array) {
    console.log("create table name = " + table.TableName);

    dynamodb.createTable(table, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
});


var docClient = new AWS.DynamoDB.DocumentClient();

var messagesTestData = JSON.parse(fs.readFileSync('messagesTestData.json', 'utf8'));

console.debug(messagesTestData);

messagesTestData.forEach(function(messageTestData) {
    var params = {
        TableName: "Messages",
        Item: {
            "channelId":  messageTestData.channelId,
            "sendDate": messageTestData.sendDate,
            "body":  messageTestData.body
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add message", messageTestData.channelId, messageTestData.sendDate, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", messageTestData.channelId, messageTestData.sendDate,);
       }
    });
});

