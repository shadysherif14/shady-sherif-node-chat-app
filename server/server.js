const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 300;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

// Public folder
app.use(express.static(path.join(__dirname, '../public')));

// Listen on port
server.listen(port, () => console.log(`Server starts on port ${port}`));

// Socket events
io.on('connection', socket => {


    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        created_at: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        created_at: new Date().getTime()
    });

    console.log('User connected');
    
    socket.on('createMessage', (message) => {

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            created_at: new Date().getTime()
        });

        /* socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            created_at: new Date().getTime()
        }); */

    });

    socket.on('disconnect', () => console.log('User disconnected'));
});