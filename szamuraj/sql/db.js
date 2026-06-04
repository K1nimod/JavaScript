import database from "better-sqlite3";

const db = new database("db.sqlite");

db.prepare(`
    CREATE TABLE IF NOT EXISTS equipment (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        type TEXT, 
        price INTEGER, 
        material TEXT,
        image_url TEXT
    )
`).run();

const itemCount = db.prepare('SELECT COUNT(*) AS count FROM equipment').get();

if (itemCount.count === 0) {
    const defaultItems = [
        { name: "Középkori Katana", type: "Fegyver", price: 150000, material: "Tamahagane acél", image_url: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=400" },
        { name: "Kabuto Sisak", type: "Páncél", price: 85000, material: "Díszített vas", image_url: "https://images.unsplash.com/photo-1590255371622-be16bc3568fa?w=400" },
        { name: "Dó-maru Páncél", type: "Páncél", price: 290000, material: "Lakkozott bőr és fém", image_url: "https://images.unsplash.com/photo-1615551381335-b28e676b9760?w=400" },
        { name: "Wakizashi", type: "Fegyver", price: 95000, material: "Hajtogatott acél", image_url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400" },
        { name: "Mempo Maszk", type: "Kiegészítő", price: 45000, material: "Kovácsoltvas", image_url: "https://images.unsplash.com/photo-1547631289-02ae5319626b?w=400" },
        { name: "Tsuba", type: "Kiegészítő", price: 35000, material: "Vas arany berakással", image_url: "https://militaria-nagyaruhaz.hu/uploads/shop/militaria-nagyaruhaz.hu/termek/3438162_big.jpg" }
    ];

    const insert = db.prepare('INSERT INTO equipment (name, type, price, material, image_url) VALUES (?, ?, ?, ?, ?)');
    
    defaultItems.forEach(item => {
        insert.run(item.name, item.type, item.price, item.material, item.image_url);
    });
}

export const getAllItems = () => db.prepare('SELECT * FROM equipment').all();
export const getItemById = (id) => db.prepare("SELECT * FROM equipment WHERE id = ?").get(id);
export const addItem = (name, type, price, material, image_url) => db.prepare('INSERT INTO equipment (name, type, price, material, image_url) VALUES (?, ?, ?, ?, ?)').run(name, type, price, material, image_url);
export const updateItem = (id, name, type, price, material, image_url) => db.prepare('UPDATE equipment SET name = ?, type = ?, price = ?, material = ?, image_url = ? WHERE id = ?').run(name, type, price, material, image_url, id);
export const deleteItem = (id) => db.prepare('DELETE FROM equipment WHERE id = ?').run(id);