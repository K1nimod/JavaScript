import express from "express";
import * as db from "./sql/db.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/videojatek.html");
});

app.get("/games", (req, res) => {
    const games = db.getAllGames();
    res.status(200).json(games);
});

app.get("/games/:id", (req, res) => {
    const game = db.getGameById(+req.params.id);
    if (!game) {
        return res.status(404).json({ error: "A videojáték nem található" });
    }
    res.status(200).json(game);
});

app.post("/games", (req, res) => {
    const { title, release, platform, category } = req.body;
    if (!title || !release || !platform || !category) {
        return res.status(400).json({ error: "Minden adatot meg kell adni!" });
    }
    const tmp = db.addGame(title, release, platform, category);
    const newGame = db.getGameById(tmp.lastInsertRowid); 
    res.status(201).json(newGame);
});

app.put("/games/:id", (req, res) => {
    const gameId = +req.params.id;
    const game = db.getGameById(gameId);
    if (!game) {
        return res.status(404).json({ error: "A videojáték nem található" });
    }

    const { title, release, platform, category } = req.body;
    if (!title || !release || !platform || !category) {
        return res.status(400).json({ error: "Minden mezőt ki kell tölteni!" });
    }

    db.updateGame(gameId, title, release, platform, category);
    res.status(200).json(db.getGameById(gameId));
});

app.delete("/games/:id", (req, res) => {
    const game = db.getGameById(+req.params.id);
    if (!game) {
        return res.status(404).json({ error: "A videojáték nem található" });
    }
    db.deleteGame(+req.params.id);
    res.status(204).json();
});

app.listen(PORT, () => {
    console.log(PORT);
});