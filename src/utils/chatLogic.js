export const getSender = (loggedUser, users) => {
    if (users.length > 0) {
        const senderName = users[0]._id === loggedUser ? users[1].name : users[0].name;
        return senderName;
    } else {
        return null
    }

}

export const getIdObjectFromArray=(arr)=>{
    const idArr=[]
    for(let val of arr)
    {
        idArr.push(val._id)
    }
    
    const obj={}
    for(let val of idArr)
    {
        obj[val]=true
    }
    
    return obj
}
