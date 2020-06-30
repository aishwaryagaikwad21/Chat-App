const socket = io() //connecting to server

socket.on('countEvents',(count)=>{
    console.log("Count updated!",count)
})

document.querySelector('#increment').addEventListener('click',()=>{
    console.log('Clicked')
    socket.emit('increment')
})