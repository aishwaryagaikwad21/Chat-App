const users = []

//add user, remove user, get user, getUser in room data

const addUser=({id,username,room})=>{
    //clean data

    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if(!username || !room){
        return{
            error:'Username and room are required'
        }
    }
    //checking for existing user
    const existingUser = users.find((user)=>{
        return user.room === room && user.username
    })

    if(existingUser){
        return{
            error:'Username taken!'
        }
    }

    //store user
    const user = {id,username,room}
    users.push(user)
    console.log(users)
    return {user}
    
}

const removeUser=(id)=>{
    const index = users.findIndex((user)=>{
        return user.id===id
    })
    if(index!==-1){
        return users.splice(index,1)[0]
    }
}
const getUser = (id)=>{
    return users.find((user)=>{
        user.id===id
    })
}
addUser({
    id:22,
    username:'  AiShwarYa',
    room:'abcd'
})
addUser({
    id:23,
    username:'elena',
    room:'abcd'
})
addUser({
    id:24,
    username:'nairobi',
    room:'center'
})

const user = getUser(22)
console.log(user)
//console.log(users)




// const removed = removeUser(22)
// console.log(removed)
// console.log(users)

 
// const res = addUser({
//     id:33,
//     username:'',
//     room:''
// })
// console.log(res)

