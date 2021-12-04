var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const messages = [];
var numMessages = 0;

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket){
    console.log('A user connected');

    socket.send("Connected to chat server\r\n");

    // Show all of the previous messages before connection
    for(let i = 0; i < messages.length; ++i) {
        socket.emit('missed', messages[i] + "\r\n");
    }

    // return message to client
    socket.on('clientEvent', function(data){
        console.log(data);
        io.sockets.emit('broadcast', data);
        messages[numMessages] = data;
        numMessages += 1;
    });

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});