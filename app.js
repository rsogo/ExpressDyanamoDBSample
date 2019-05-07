
// var message = require('./Message');
import Message from './Message';

const express = require('express')
const app = express()
const port = 8080

// JSONを扱うために必要
const bodyParser = require('body-parser');

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



// JavaScriptの文字列。"や'以外に、バッククォート`はテンプレートリテラル。
app.get('/', (req, res) => res.send('Hello world!'))

// 複数のURLを用意できる
app.get('/hello', (req, res) => {
    console.log(req.query)
    res.send('world!')
})

app.get('/:channelId/messages', function(req, res) {
    var message = new Message();
    message.list(req, res);
})

app.get('/:channelId/message/:sendDate', function(req, res) {
    var message = new Message();
    message.get(req, res);
})

app.post('/:channelId/message', function(req, res) {

    var message = new Message();
    message.channelId = req.params.channelId;
    message.sendDate = req.body.sendDate;
    message.body = req.body.body;
    res.send(message.create());
})

// app.put('/:channelId/message/:sendDate', message.edit)
// app.delete('/:channelId/message/:sendDate', message.delete)


// リッスン開始
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

