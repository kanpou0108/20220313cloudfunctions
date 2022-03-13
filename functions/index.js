// index.js
const functions = require("firebase-functions");
const express = require("express");
const requestPromise = require("request-promise-native"); // 追加

const app = express();

// APIにリクエストを送る関数を定義
const getDataFromApi = async (keyword) => {
  // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
  const requestUrl =
    "https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:";
  const result = await requestPromise(`${requestUrl}${keyword}`);
  return result;
};

app.get("/hello", (req, res) => {
  res.send("Hello Express!");
});

app.get("/user/:userId", (req, res) => {
  // 省略
});

// エンドポイント追加
app.get("/gbooks/:keyword", async (req, res) => {
  // APIリクエストの関数を実行
  const response = await getDataFromApi(req.params.keyword);
  res.send(response);
});

const api = functions.https.onRequest(app);
module.exports = { api };
