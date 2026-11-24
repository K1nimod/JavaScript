import database from "better-sqlite3";
const db = new database("cars.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`).run();
db.prepare(`
    CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        model TEXT,
        brand TEXT,
        year INTEGER,
        price INTEGER,
        image_url TEXT,
        is_public INTEGER
    )
`).run();

const count = db.prepare('SELECT COUNT(*) AS count FROM users').get();
if (count.count === 0) {
    const addU = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    addU.run("bela", "1234");
    addU.run("anna", "1234");
    const list = [
        { user_id: 1, model: "M3 Competition", brand: "BMW", year: 2022, price: 28500000, image_url: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400", is_public: 1 },
        { user_id: 1, model: "911 GT3 (Privát)", brand: "Porsche", year: 2023, price: 65000000, image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400", is_public: 0 },
        { user_id: 2, model: "RS6 Avant", brand: "Audi", year: 2021, price: 34000000, image_url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400", is_public: 1 },
        { user_id: 2, model: "Mustang GT", brand: "Ford", year: 2019, price: 14500000, image_url: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=400", is_public: 1 }
    ];
    const addC = db.prepare('INSERT INTO cars (user_id, model, brand, year, price, image_url, is_public) VALUES (?, ?, ?, ?, ?, ?, ?)');
    list.forEach(c => addC.run(c.user_id, c.model, c.brand, c.year, c.price, c.image_url, c.is_public));
}

export const getUser = (username) => db.prepare('SELECT * FROM users WHERE username = ?').get(username);
export const loginUser = (username, password) => db.prepare('SELECT id, username FROM users WHERE username = ? AND password = ?').get(username, password);
export const registerUser = (username, password) => db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, password);
export const getPublicCars = () => db.prepare(`SELECT cars.*, users.username AS owner FROM cars JOIN users ON cars.user_id = users.id WHERE cars.is_public = 1`).all();
export const getUserCars = (id) => db.prepare('SELECT * FROM cars WHERE user_id = ?').all(id);
export const getCar = (id) => db.prepare('SELECT * FROM cars WHERE id = ?').get(id);
export const addCar = (user_id, model, brand, year, price, image_url, is_public) => db.prepare('INSERT INTO cars (user_id, model, brand, year, price, image_url, is_public) VALUES (?, ?, ?, ?, ?, ?, ?)').run(user_id, model, brand, year, price, image_url, is_public);
export const updateCar = (id, model, brand, year, price, image_url, is_public) => db.prepare('UPDATE cars SET model = ?, brand = ?, year = ?, price = ?, image_url = ?, is_public = ? WHERE id = ?').run(model, brand, year, price, image_url, is_public, id);
export const deleteCar = (id) => db.prepare('DELETE FROM cars WHERE id = ?').run(id);