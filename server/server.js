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
    
    socket.emit('newMessage', {
        body: 'I Love Lobna',
        from: 'Shady',
        created_at: Date.now()
    });

    socket.on('createMessage', (data) => console.log(data));

    socket.on('disconnect', () => console.log('User disconnected'));
});