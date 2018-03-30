const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage ,generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname , '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server); 
var users = new Users();

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

    // socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    // socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

    socket.on('join', (params, callback) => {
        if ( !isRealString(params.name) || !isRealString(params.room) ) {
           return callback('Name and Room Name is Required');
        }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('UpdateUsersList',users.getUserList(params.room));


        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));        
        
        callback();
    });

     socket.on('createMessage',(newMessage,callback) => {
        console.log('createMessage', newMessage);

        var user = users.getUsers(socket.id);

        if ( user && isRealString(newMessage.text) ) {
            io.to(user.room).emit('newMessage',generateMessage(user.name,newMessage.text));
            // callback();
        }

        callback();

        // io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
        // callback();
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
         let user = users.getUsers(socket.id);

         if ( user ) {
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));   
            // callback();         
         }
        //  callback();
        //  io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
     })

     socket.on('disconnect',() => {
         var user = users.removedUser(socket.id);
         if(user){
             io.to(user.room).emit('UpdateUsersList',users.getUserList(user.room));
             io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
         }
         console.log('User Was Disconnected ');
     });
});

server.listen(3000,() => {
    console.log('Server is up on 3000');
});



