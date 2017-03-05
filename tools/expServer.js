let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
// let path = require('path');

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

app.get('/', (req, res) => {
  res.send('socket');
});


function check() {
  // console.log(io.sockets.sockets);
}

io.on('connection', socket => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
    io.emit('disconnect');
  });
  socket.on('user connected', nickname => {
    console.log(nickname);
    io.emit('user connected', nickname);
  });

  socket.on(`chat message`, message => {
    console.log(`New message: ${message}`);
    io.emit(`chat message`, message);
  });

  socket.on('connected users', () => {
    console.log('ALL OF THEM');
    const objects = io.sockets.connected;
    const test = Object.keys(objects);
    io.emit('connected users', test);
    check();
  });
});


http.listen(8000, () => {
  console.log('listening on :8000');
});
