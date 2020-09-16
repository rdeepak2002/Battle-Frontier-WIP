const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


// TODO: look into this - https://www.codevate.com/blog/developing-a-scalable-real-time-desktop-or-mobile-application-with-socketio-redis-and-haproxy


app.listen(process.env.PORT || 5000);
