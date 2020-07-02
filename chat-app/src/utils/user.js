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
        return user.room === room && user.username === username
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
    const index = users.findIndex((user)=>{ //filter will search even when found, findIndex returns once found
        return user.id===id
    })
    if(index!==-1){
        return users.splice(index,1)[0] //match found and splice removes by index
    }
}

const getUser = (id)=>{
     return users.find((user)=>user.id === id)
}

const getUsersInRoom = (room)=>{
    return users.filter((user)=>user.room === room)
}

addUser({
    id:22,
    username:'aisHwaRYA  ',
    room:'abc'
})
addUser({
    id:23,
    username:'elena',
    room:'abc'
})
addUser({
    id:24,
    username:'rachel',
    room:'bcd'
})
const userfind = getUser(22)
//console.log(users)
console.log(userfind)

const userList = getUsersInRoom('abc')
console.log(userList)