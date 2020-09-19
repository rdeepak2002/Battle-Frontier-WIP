const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {pingInterval: 2000});

// defining the static directory as the build folder of the frontend
app.use(express.static(path.join(__dirname, '../WebApp/build')));

/**
 * function to return the frontend when the root url is visited
 */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../WebApp/build', 'index.html'));
});

/**
 * handle sockets
 */
io.on('connection', socket => {
  console.log("client connected!");
  // TODO: look into this - https://www.codevate.com/blog/developing-a-scalable-real-time-desktop-or-mobile-application-with-socketio-redis-and-haproxy

  // socket.emit('request', /* … */); // emit an event to the socket
  // io.emit('broadcast', /* … */); // emit an event to all connected sockets
  // socket.on('reply', () => { /* … */ }); // listen to the event
});

// application listening on the default port or 5000
server.listen(process.env.PORT || 5000);
