import express from "express";
import * as db from "./db/db.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/cars.html");
});

app.get("/belepes", (req, res) => {
    res.sendFile(process.cwd() + "/belepes.html");
});

app.get("/garazs", (req, res) => {
    res.sendFile(process.cwd() + "/garazs.html");
});

app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Minden mezőt ki kell tölteni!" });
    }
    if (db.getUser(username)) {
        return res.status(400).json({ error: "Ez a felhasználónév már foglalt!" });
    }
    const resDb = db.registerUser(username, password);
    res.status(201).json({ id: resDb.lastInsertRowid, username });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Minden mezőt ki kell tölteni!" });
    }
    const user = db.loginUser(username, password);
    if (!user) {
        return res.status(401).json({ error: "Hibás felhasználónév vagy jelszó!" });
    }
    res.status(200).json(user);
});

app.get("/cars/public", (req, res) => {
    res.status(200).json(db.getPublicCars());
});

app.get("/cars/user/:id", (req, res) => {
    res.status(200).json(db.getUserCars(+req.params.id));
});

app.post("/cars", (req, res) => {
    const { user_id, model, brand, year, price, image_url, is_public } = req.body;
    if (!user_id) {
        return res.status(401).json({ error: "Előbb jelentkezz be!" });
    }
    if (!model || !brand || !year || !price || !image_url) {
        return res.status(400).json({ error: "Minden adatot meg kell adni!" });
    }
    const resDb = db.addCar(user_id, model, brand, year, price, image_url, is_public ? 1 : 0);
    res.status(201).json(db.getCar(resDb.lastInsertRowid));
});

app.put("/cars/:id", (req, res) => {
    const id = +req.params.id;
    const car = db.getCar(id);
    if (!car) {
        return res.status(404).json({ error: "Az autó nem található" });
    }
    const { user_id, model, brand, year, price, image_url, is_public } = req.body;
    if (car.user_id !== +user_id) {
        return res.status(403).json({ error: "Más felhasználó autóját nem módosíthatod!" });
    }
    if (!model || !brand || !year || !price || !image_url) {
        return res.status(400).json({ error: "Minden mezőt ki kell tölteni!" });
    }
    db.updateCar(id, model, brand, year, price, image_url, is_public ? 1 : 0);
    res.status(200).json(db.getCar(id));
});

app.delete("/cars/:id", (req, res) => {
    const id = +req.params.id;
    const car = db.getCar(id);
    if (!car) {
        return res.status(404).json({ error: "Az autó nem található" });
    }
    const uid = +req.headers["user-id"];
    if (car.user_id !== uid) {
        return res.status(403).json({ error: "Más felhasználó autóját nem törölheted!" });
    }
    db.deleteCar(id);
    res.status(204).json();
});

app.listen(PORT, () => {
    console.log(PORT);
});