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

let count = 0

io.on('connection',(socket)=>{
    console.log('New websocket connection')

    socket.emit('countEvents',count) //server sends updated count to client

    socket.on('increment',()=>{ //listening cient events
        count++
        //socket.emit('countEvents',count)  //socket.emit emits to specific user
        io.emit('countEvents',count) //io.emit emits to all connected clients
    })
})

server.listen(port,()=>{
    console.log('Server running on port',port);
})

