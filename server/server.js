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
   
     socket.emit('newEmail', {
         'from': 'ajit@gmail.com',
         'text': 'Hey How you doing',
         'createdAt': '123'
     });

     socket.emit('newMessage', {
         from: 'Ajeet',
         text: 'Hii How are you doing',
         createdAt: 123
     });


     socket.on('createEmail',(newEmail) => {
        console.log('createEmail', newEmail);
     });

     socket.on('createMessage',(newMessage) => {
        console.log('createMessage',newMessage);
     });

     socket.on('disconnect',() => {
         console.log('User Was Disconnected ');
     });
});

server.listen(3000,() => {
    console.log('Server is up on 3000');
});



