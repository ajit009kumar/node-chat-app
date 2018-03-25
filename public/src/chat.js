var socket = io(); 


function scrollToBottom() {

    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');

    //Heights

    let clientHeight = messages.prop('clientHeight'); // visible height conatiner
    let scrollTop = messages.prop('scrollTop'); // Height pf top scroller
    let scrollHeight = messages.prop('scrollHeight'); // Entire height of the message container
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if ( clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }

}

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
    
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();

    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
});


socket.on('newLocationMessage',function(message){
    
    let formattedTime =  moment(message.createdAt).format('h:mm a');

    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template,{
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target = "_blank">My current location</a>');
    // li.text(`${message.from} ${formattedTime} :`);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);

})

// socket.emit('createMessage',{
//     from: 'Frank',
//     text: 'Hii'
// },function(data){
//     console.log('Got it',data);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    let messageTextBox = jQuery('[name = "message"]');
    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox.val()
    },function(){
        messageTextBox.val(' ');
    })
})

let locationButton = jQuery('#send-location');

locationButton.on('click',function(){
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending location ...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        console.log(position);
    },function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch Location');
    });
});