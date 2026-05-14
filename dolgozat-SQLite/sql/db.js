import database from "better-sqlite3";

const db = new database("db.sqlite");
db.prepare('CREATE TABLE IF NOT EXISTS posts ( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)').run()

export const getAllPost = () => db.prepare('SELECT * from posts').all();
export const getPostById = (id) => db.prepare("SELECT * from posts WHERE id = ? ").get(id);
export const uploadPost = (title,content) => db.prepare('INSERT INTO posts (title,content) VALUES(?,?)').run(title,content);
export const deletePost  = (id) => db.prepare(`DELETE FROM posts WHERE id = ?`).run(id);

