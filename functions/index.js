// index.js

const functions = require("firebase-functions");
// Expressの読み込み
const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  // レスポンスの設定
  res.send("Hello Express!");
});

// 出力
const api = functions.https.onRequest(app);
module.exports = { api };