const users =
[   
    {id: 1, name:'Ann'},
    {id: 2, name:'Anna'},
    {id: 3, name:'Ani'},

];

export const getAllUsers = (req,res) =>
{
    res.status(200).json(users);
}

export const getUserId = (req,res) =>
{
    const id = +req.params.id;
    /*const id = parsInt(req.params.id); //szam lesz belole
    const id = Numbers(req.params.id);*/
    //const user = users[id - 1];
    const user = users.find(x => x.id == id);
    if(!user){
        return res.status(404).json({message: `User nincs`})
    }
    res.json(user);
}

export const saveUser = (req,res) =>
{   
    // const {name} = req.body; 
    const name = req.body.name;
    if(!name)
    {
        return res.status(400).json({message: "cssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaa"})
    }
    const id = (users[users.lenght - 1]?.id || 0) + 1;
    const user = {id,name};
    users.push(user);
    res.json(user);
}

export const updateUser = (req,res) =>{
    const id = +req.params.id;
    const {name} = req.body;
    if(!name)
    {
        return res.status(400).json({ message:"cccccccccccsssssssssssssssssssss"})
    }
    const user = users.find((x) => x.id === id);
    if(!user)
    {
        return res.status(404).json({message: "nincs user"})
    }
    user.name = name;
    res.status(200).json({message: "sikeres"})

}

export const updateAllUsers = (req,res) =>{
    const id = +req.params.id;
    const {name} = req.body;
    if(!name)
    {
        return res.status(400).json({ message:"cccccccccccsssssssssssssssssssss"})
    }
    const user = users.find((x) => x.id === id);
    if(!user)
    {
        return res.status(404).json({message: "nincs user"})
    }
    user.name = name;
    res.status(200).json({message: "sikeres"})

}

export const deleteUser = (req,res) =>
{
    const id = +req.params.id;
    const user = users.find((x) => x.id === id);
    if(!user)
    {
        return res.status(404).json({message: "nincs user"})
    }
    users = users.filter(x => x != user);
    res.status(200).json({message: "sikeres"})

}

//export{saveUser, getAllUsers, getUserId, updateUser, updateAll, deleteUser}