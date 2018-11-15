let socket = io();

socket.on('connect', () => {

    console.log('Connected to server');

    socket.emit('createMessage', {
        text: 'I Love Lobna',
        from: 'Shady',
    });

    socket.on('newMessage', (message) => {
        console.log(message);
    });
});

socket.on('disconnect', () => console.log('Disconnected from server'));
