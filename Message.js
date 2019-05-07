var TABLE_NAME = "Messages";
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

export default class {

    // var channelId;
    // var sendDate;
    // var body;

    constructor(){};
    
    // set channelId(value) {
    //     this.channelId = value;
    // }
    // get channelId() {
    //     return this.channelId;
    // }

    // set sendDate(value) {
    //     this.sendDate = value;
    // }
    // get sendDate() {
    //     return this.sendDate;
    // }

    // set body(value) {
    //     this.body = value;
    // }
    // get body() {
    //     return this.body;
    // }

    create() {

        var docClient = new AWS.DynamoDB.DocumentClient();
        
        // console.debug(messagesTestData);
        
        var params = {
            TableName: "Messages",
            Item: {
                "channelId":  this.channelId,
                "sendDate": this.sendDate,
                "body":  this.body
            }
        };
    
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add message", this.channelId, this.sendDate, ". Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("PutItem succeeded:", this.channelId, this.sendDate,);
            }
        });
    };


    list(req, res){

        this.channelId = req.params.channelId;
        console.log('channelId=' + this.channelId);

        var params = {
            TableName : `${TABLE_NAME}`,
            KeyConditionExpression: "#channelId = :channelId",
            ExpressionAttributeNames:{
                "#channelId": "channelId"
            },
            ExpressionAttributeValues: {
                ":channelId": `${this.channelId}`
            }
        };

        var docClient = new AWS.DynamoDB.DocumentClient();

        docClient.query(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                res.send(data);
            }
        });

    };


    get(req, res){

        this.channelId = req.params.channelId;
        this.sendDate = req.params.sendDate;

        console.log('channelId=', this.channelId, ' sendDate=', this.sendDate);

        var params = {
            TableName : `${TABLE_NAME}`,
            KeyConditionExpression: "#channelId = :channelId and #sendDate = :sendDate",
            ExpressionAttributeNames:{
                "#channelId": "channelId",
                "#sendDate": "sendDate"
            },
            ExpressionAttributeValues: {
                ":channelId": `${this.channelId}`,
                ":sendDate": `${this.sendDate}`
            }
        };

        var docClient = new AWS.DynamoDB.DocumentClient();

        docClient.query(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                res.send(data.Items[0]);
            }
        });

    };

    edit(req, res){
        res.send(messages);
    };

    delete(req, res){
        res.send(messages);
    };
}

exports.tableDef = {
    TableName : "Messages",
    KeySchema: [       
        { AttributeName: "channelId", KeyType: "HASH"},  //Partition key
        { AttributeName: "sendDate", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "channelId", AttributeType: "S" },
        { AttributeName: "sendDate", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

