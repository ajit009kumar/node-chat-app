const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage ,generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname , '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server); 

app.use(express.static(publicPath));

io.on('connection',(socket) => {
     console.log('New user connected');
   
    //  socket.emit('newEmail', {
    //      'from': 'ajit@gmail.com',
    //      'text': 'Hey How you doing',
    //      'createdAt': '123'
    //  });

    //  socket.on('createEmail',(newEmail) => {
    //     console.log('createEmail', newEmail);
    //  });

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

     socket.on('createMessage',(newMessage,callback) => {
        console.log('createMessage', newMessage);
        io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
        callback();
            // from: newMessage.from,
            // text: newMessage.text,
            // createdAt: new Date().getTime()
        // });

        // socket.broadcast.emit('newMessage',{
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()

        // })

     });

     socket.on('createLocationMessage',(coords) => {
         io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
     })

     socket.on('disconnect',() => {
         console.log('User Was Disconnected ');
     });
});

server.listen(3000,() => {
    console.log('Server is up on 3000');
});



