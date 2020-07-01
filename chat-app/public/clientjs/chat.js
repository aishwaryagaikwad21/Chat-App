const socket = io() //connecting to server
socket.on('message',(message)=>{
    console.log(message)
})

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button')

$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    $messageFormButton.setAttribute('disabled','disabled')

    const message = e.target.elements.message.value
    socket.emit('sendMessage',message,(error)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value=''
        $messageFormInput.focus()
        if(error){
           return console.log(error)
        }
        console.log('Message delivered',message)
    })
})

const $locationButton = document.querySelector('#sendLocation')

$locationButton.addEventListener('click',()=>{
    $locationButton.setAttribute('disabled','disabled')
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.')
    }
    else{
        navigator.geolocation.getCurrentPosition((position)=>{
            //console.log(position)
            socket.emit('sendLocation',{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            },()=>{
                console.log('Location shared!')
                $locationButton.removeAttribute('disabled')
            })
        })
    }
})

// socket.on('countEvents',(count)=>{
//     console.log("Count updated!",count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('Clicked')
//     socket.emit('increment')
// })