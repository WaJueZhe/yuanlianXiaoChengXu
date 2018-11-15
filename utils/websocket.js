// var sockjs = require("sockjs.js")
var socketOpen = false
var socketMsgQueue = []
function sendSocketMessage(msg) {
  console.log('send msg:')
  console.log(msg);
  if (socketOpen) {
    wx.sendSocketMessage({
      data: msg
    })
  } else {
    socketMsgQueue.push(msg)
  }
}

/////////////////////////////////////////////////////
var ws = {
  send: sendSocketMessage,
  onopen: null,
  onmessage: null
}

wx.connectSocket({
  url: 'wss://www.bcscm.net/chatApp'
})
wx.onSocketOpen(function (res) {
  console.log('WebSocket连接已打开！')

  socketOpen = true
  for (var i = 0; i < socketMsgQueue.length; i++) {
    sendSocketMessage(socketMsgQueue[i])
  }
  socketMsgQueue = []

  ws.onopen && ws.onopen()
})

wx.onSocketMessage(function (res) {
  console.log('收到onmessage事件:', res)
  ws.onmessage && ws.onmessage(res)
})

var Stomp = require('stomp.js').Stomp;
Stomp.setInterval = function () { }
Stomp.clearInterval = function () { }
var client = Stomp.over(ws);

var destination = '/topic/myTopic';
client.connect('user', 'pass', function (sessionId) {
  console.log('sessionId', sessionId)

  client.subscribe(destination, function (body, headers) {
    console.log('From MQ:', body);
  });

  client.send(destination, { priority: 9 }, 'hello workyun.com !');
})