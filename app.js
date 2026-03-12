import express from 'express'

const PORT = 3030
const app = express()
app.use(express.json())

const diakok = [
    {id: 1, name:"csaba", subject:"info"},
    {id: 2, name:"horka", subject:"matek"},
    {id: 3, name:"sutyi", subject:"töri"}
]

app.get("/students/:id", (req,res)=>{
    const id = +req.params.id;
    const diak = diakok.find(d => d.id == id)
    if(!diak)
    {
        return res.status(404).json({message : "Student not found"})
    }
    res.status(200).json(diak)
})

app.post('/students', (req,res)=>{
    const {name, subject} = req.body
    if(!name || !subject)
    {
        return res.status(400).json({message:"Name and subject are required"})
    }
    const id = diakok[diakok.length - 1]?.id + 1
    const diak = {id, name, subject}
    diakok.push(diak)
    res.status(201).json(diak)
})

app.put("students/:id", (req,res)=>{
    const id = +req.params.id
    const diak = diakok.find(d => d.id == id)
    if(!diak)
    {
        return res.status(404).json({message : "Student not found"})
    }
    const {name, subject} = req.body
    if(!name || !subject)
    {
        return res.status(400).json({message:"Name and subject are required"})
    }
    diak.name = name
    diak.subject = subject
    res.status(200).json(diak)
})

app.listen(PORT, () =>{
    console.log(PORT)
})