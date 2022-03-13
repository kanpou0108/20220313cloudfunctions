const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello Express!");
});

// ↓↓↓ エンドポイントを追加 ↓↓↓
app.get("/user/:userId", (req, res) => {
  const users = [
    { id: 1, name: "ジョナサン" },
    { id: 2, name: "ジョセフ" },
    { id: 3, name: "承太郎" },
    { id: 4, name: "仗助" },
    { id: 5, name: "ジョルノ" },
  ];
  // req.params.userIdでURLの後ろにつけた値をとれる．
  const targetUser = users.find(
    (user) => user.id === Number(req.params.userId)
  );
  res.send(targetUser);
});

// 以降変更なし
const api = functions.https.onRequest(app);
module.exports = { api };
