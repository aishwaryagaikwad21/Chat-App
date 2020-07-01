const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server);//express does not have access to pass hence raw http server is created 

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

io.on('connection',(socket)=>{
    console.log('New websocket connection');
    socket.emit('message','Welcome!')
    socket.broadcast.emit('message','A new user has joined!') //send to all users except the sender
    socket.on('sendMessage',(message)=>{
        io.emit('message',message)
    })

    socket.on('disconnect',()=>{
        io.emit('message',"A user left!")
    })
})

server.listen(port,()=>{
    console.log('Server running on port',port);
})

