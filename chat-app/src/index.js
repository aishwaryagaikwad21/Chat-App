const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage,generateLocationMessage}=require('./utils/messages')



const app = express();
const server = http.createServer(app)
const io = socketio(server);//express does not have access to pass hence raw http server is created 

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

io.on('connection',(socket)=>{
    //console.log('New websocket connection');
    
    
    socket.on('join',({username,room})=>{
        socket.join(room)
        socket.emit('message',generateMessage('Welcome'))
        socket.broadcast.to(room).emit('message',generateMessage(`${username} has joined`)) //send to all users except the sender
    })
    socket.on('sendMessage',(message,callback)=>{
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }
        io.emit('message',generateMessage(message))
        callback('Delivered')
    })

    socket.on('sendLocation',(coords,callback)=>{
        //socket.broadcast.emit('message',`Location: ${coords.latitude}, ${coords.longitude}`)
        io.emit('locationMessage',generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })
    
    socket.on('disconnect',()=>{
        io.emit('message',generateMessage('A user has left!'))
    })
})

server.listen(port,()=>{
    console.log('Server running on port',port);
})




