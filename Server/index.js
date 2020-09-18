const express = require('express');
const path = require('path');
const app = express();

// defining the static directory as the build folder of the frontend
app.use(express.static(path.join(__dirname, '../WebApp/build')));

/**
 * function to return the frontend when the root url is visited
 */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../WebApp/build', 'index.html'));
});

// TODO: look into this - https://www.codevate.com/blog/developing-a-scalable-real-time-desktop-or-mobile-application-with-socketio-redis-and-haproxy

// application listening on the default port or 5000
app.listen(process.env.PORT || 5000);
