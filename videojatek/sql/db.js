import database from "better-sqlite3";

const db = new database("db.sqlite");

db.prepare(`
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT, 
        release INTEGER, 
        platform TEXT, 
        category TEXT
    )
`).run();

const gameCount = db.prepare('SELECT COUNT(*) AS count FROM games').get();

if (gameCount.count === 0) {
    const defaultGames = [
        { title: "The Witcher 3: Wild Hunt", release: 2015, platform: "PC, PlayStation, Xbox", category: "RPG" },
        { title: "Minecraft", release: 2011, platform: "PC, PlayStation, Xbox", category: "Sandbox" },
        { title: "Grand Theft Auto V", release: 2013, platform: "PC, PlayStation, Xbox", category: "Action" },
        { title: "Elden Ring", release: 2022, platform: "PC, PlayStation, Xbox", category: "RPG" },
        { title: "Super Mario Odyssey", release: 2017, platform: "Nintendo", category: "Platformer" }
    ];

    const insert = db.prepare('INSERT INTO games (title, release, platform, category) VALUES (?, ?, ?, ?)');
    
    defaultGames.forEach(game => {
        insert.run(game.title, game.release, game.platform, game.category);
    });
}

export const getAllGames = () => db.prepare('SELECT * FROM games').all();
export const getGameById = (id) => db.prepare("SELECT * FROM games WHERE id = ?").get(id);
export const addGame = (title, release, platform, category) => db.prepare('INSERT INTO games (title, release, platform, category) VALUES (?, ?, ?, ?)').run(title, release, platform, category);
export const updateGame = (id, title, release, platform, category) => db.prepare('UPDATE games SET title = ?, release = ?, platform = ?, category = ? WHERE id = ?').run(title, release, platform, category, id);
export const deleteGame = (id) => db.prepare('DELETE FROM games WHERE id = ?').run(id);