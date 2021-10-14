
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));


function onConnection(socket){
  socket.on('drawing', function(data){
    socket.broadcast.emit('drawing', data);
  });
  
  socket.on('rectangle', function(data){
    socket.broadcast.emit('rectangle', data);
  });
  
  socket.on('linedraw', function(data){
    socket.broadcast.emit('linedraw', data);
  });
  
   socket.on('eraser', function(data){
    socket.broadcast.emit('eraser', data);
  });
  
  socket.on('ellipsedraw', function(data){
    socket.broadcast.emit('ellipsedraw', data);
  });
  
  socket.on('textdraw', function(data){
    socket.broadcast.emit('textdraw', data);
  });

  socket.on('notedraw', function(data){
    socket.broadcast.emit('notedraw', data);
  });

  socket.on('copyCanvas', function(data){
    socket.broadcast.emit('copyCanvas', data);
  });
  
  socket.on('Clearboard', function(data){
    socket.broadcast.emit('Clearboard', data);
  });
 
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
