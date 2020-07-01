const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io')
const Filter = require('bad-words')

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
    socket.on('sendMessage',(message,callback)=>{
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }
        io.emit('message',message)
        callback('Delivered')
    })

    socket.on('sendLocation',(coords,callback)=>{
        //socket.broadcast.emit('message',`Location: ${coords.latitude}, ${coords.longitude}`)
        io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })
    
    socket.on('disconnect',()=>{
        io.emit('message',"A user left!")
    })
})

server.listen(port,()=>{
    console.log('Server running on port',port);
})




