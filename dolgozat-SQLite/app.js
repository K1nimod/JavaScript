import express from "express";
import * as db from "./sql/db.js";

const app = express();
const PORT = 3080;


app.use(express.json());

app.get("/posts", (req,res) => {
    const post = db.getAllPost();
    res.status(200).json(post);
})

app.get("/posts/:id", (req,res) => {
    const post = db.getPostById(+req.params.id);
    if(!post)
    {
        return res.status(404).json({error: "Poszt nem található"});
    }
    res.status(200).json(post);
})

app.post("/posts", (req,res) => {
    const{title,content} = req.body;
    if(!title || !content)
    {
        return res.status(400).json({error : "Poszt adat hiány"});
    }
    const tmp = db.uploadPost(title,content);
    const post = db.uploadPost(tmp.lastInsertRowid); 
    res.status(201).json(post);
})

app.delete("/posts/:id", (req,res)=>{
    const post = db.getPostById(+req.params.id);
    if(!post)
    {
        return res.status(404).json({error : "Poszt nem található"});
    }
    db.deletePost(+req.params.id);
    res.status(204).json();
})

app.listen(PORT, ()=>
{
    console.log(PORT);
})