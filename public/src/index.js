var socket = io(); 

socket.on('connect',function(){
    console.log('Connected to server');
    // socket.emit('createEmail',{
    //     from: 'jan@gmail.com',
    //     text: 'Hey this is jan'
    // });

});



socket.on('disconnect',function(){
    console.log('Disconnected from Server');
});

socket.on('newEmail',function(email){
    console.log('New Email',email);
});

socket.on('newMessage',function(message) {
    console.log('newMessage',message);
});

