let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
// let path = require('path');

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

app.get('/', (req, res) => {
  res.send('socket');
});

io.on('connection', socket => {
  console.log('User connected');

  // commands
  socket.on('create room', room => {
    console.log(room);
    socket.join(room);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    io.emit('disconnect');
  });

  socket.on('user connected', nickname => {
    const room = nickname.room;
    const user = nickname.nickname;
    io.in(`${room}`).emit('user connected', user);
  });

  socket.on(`chat message`, message => {
    console.log(`New message: ${message}`);
    io.in(`${message.room}`).emit(`chat message`, message);
  });

  socket.on('connected users', (room) => {
    const objects = io.sockets.connected;
    const connected = io.nsps['/'].adapter.rooms[`${room}`];
    io.emit('connected users', connected);
  });
});

http.listen(8000, () => {
  console.log('listening on :8000');
});
