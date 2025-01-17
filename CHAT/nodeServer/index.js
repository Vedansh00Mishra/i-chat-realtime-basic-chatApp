
const io = require('socket.io')(8000, {cors: {origin: "*"}});

const users = {};

io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { message, name: users[socket.id] });
    });
   
    socket.on('disconnect', (message) => {
        socket.broadcast.emit('left', { message, name: users[socket.id] });
        delete users[socket.id]
    });

    
});

