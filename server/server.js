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

    console.log('User connected');
    
    socket.on('createMessage', (message) => {

        console.log(JSON.stringify(message, null, 3));
        
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            created_at: new Date().getTime()
        });

    });

    socket.on('disconnect', () => console.log('User disconnected'));
});