import express from "express";
import * as db from "./sql/db.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/szamuraj.html");
});

app.get("/items", (req, res) => {
    const items = db.getAllItems();
    res.status(200).json(items);
});

app.get("/items/:id", (req, res) => {
    const item = db.getItemById(+req.params.id);
    if (!item) {
        return res.status(404).json({ error: "A felszerelés nem található" });
    }
    res.status(200).json(item);
});

app.post("/items", (req, res) => {
    const { name, type, price, material, image_url } = req.body;
    if (!name || !type || !price || !material || !image_url) {
        return res.status(400).json({ error: "Minden adatot meg kell adni!" });
    }
    const tmp = db.addItem(name, type, price, material, image_url);
    const newItem = db.getItemById(tmp.lastInsertRowid); 
    res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
    const itemId = +req.params.id;
    const item = db.getItemById(itemId);
    if (!item) {
        return res.status(404).json({ error: "A felszerelés nem található" });
    }

    const { name, type, price, material, image_url } = req.body;
    if (!name || !type || !price || !material || !image_url) {
        return res.status(400).json({ error: "Minden mezőt ki kell tölteni!" });
    }

    db.updateItem(itemId, name, type, price, material, image_url);
    res.status(200).json(db.getItemById(itemId));
});

app.delete("/items/:id", (req, res) => {
    const item = db.getItemById(+req.params.id);
    if (!item) {
        return res.status(404).json({ error: "A felszerelés nem található" });
    }
    db.deleteItem(+req.params.id);
    res.status(204).json();
});

app.listen(PORT, () => {
    console.log(PORT);
});