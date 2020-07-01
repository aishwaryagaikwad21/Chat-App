const socket = io() //connecting to server
socket.on('message',(message)=>{
    console.log(message)
})
document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = e.target.elements.message
    socket.emit('sendMessage',message)
})

// socket.on('countEvents',(count)=>{
//     console.log("Count updated!",count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('Clicked')
//     socket.emit('increment')
// })