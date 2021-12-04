var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket){
    console.log('A user connected');
    
    setTimeout(function(){
        socket.send("Sent message")
    }, 3000);

    setTimeout(function(){
        socket.send("Sent message 2")
    }, 6000);

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

http.listen(3000, function(){
    console.log('listening on *:3000');
});