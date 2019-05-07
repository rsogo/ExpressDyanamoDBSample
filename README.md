
# DynamoDBの実行

https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html

```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

# ディレクトリ構成案

/common
    /domains
        /channele　モデル定義＋データ取得。アプリケーションごとに作らず、まとめる
        /message
        /customer
    /utils
        /dynamoDBへのアクセスはこの層でやる？
    /tools
        dataImporter.js
        dataCleaner.js
/sales
    /views
    /router
    /config 設定はアプリごとに持って、DomainにInjectできるようにする
/consumer
    /views
    /router
    /config


開発環境はローカルのDynamoDBを使う。
マスタ、テストデータのインポートはコマンドラインでできるようにする。

Node.jsのテストコードの書き方は確認しておく。

### メッセージの取得

```
curl http://localhost:3000/001/messages
```

### メッセージの単件

```
curl http://localhost:8080/001/message/2019%2F05%2F01
```

```
curl -X POST http://localhost:8080/001/message/ -H "Content-type: application/json" -d '{"sendDate":"2019/06/01", "body":"from curl1"}'
```


