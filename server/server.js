const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname , '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server); 

app.use(express.static(publicPath));

io.on('connection',(socket) => {
     console.log('New user connected');

     socket.on('disconnect',() => {
         console.log('User Was Disconnected ');
     })
});

server.listen(3000,() => {
    console.log('Server is up on 3000');
});



