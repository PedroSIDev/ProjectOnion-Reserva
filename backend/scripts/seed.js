const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./database.sqlite');

const seedDatabase = async () => {
    // Create tables if they don't exist
    await db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )`);

    await db.run(`CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        model TEXT NOT NULL,
        owner INTEGER,
        FOREIGN KEY (owner) REFERENCES users(id)
    )`);

    await db.run(`CREATE TABLE IF NOT EXISTS maintenances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        vehicle_id INTEGER,
        date TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
    )`);

    // Insert sample users
    await db.run(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, 
        ['Admin User', 'admin@example.com', 'adminpassword', 'admin']);
    await db.run(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, 
        ['Collaborator User', 'collaborator@example.com', 'collaboratorpassword', 'collaborator']);

    // Insert a sample vehicle
    const vehicleId = await new Promise((resolve, reject) => {
        db.run(`INSERT INTO vehicles (name, model, owner) VALUES (?, ?, ?)`, 
            ['Vehicle 1', 'Model X', 1], function(err) {
                if (err) reject(err);
                resolve(this.lastID);
            });
    });

    // Insert sample maintenance records
    await db.run(`INSERT INTO maintenances (description, vehicle_id, date, status) VALUES (?, ?, ?, ?)`, 
        ['Oil Change', vehicleId, '2025-01-01', 'completed']);
    await db.run(`INSERT INTO maintenances (description, vehicle_id, date, status) VALUES (?, ?, ?, ?)`, 
        ['Tire Rotation', vehicleId, '2025-02-01', 'pending']);
};

seedDatabase()
    .then(() => {
        console.log('Database seeded successfully');
        db.close();
    })
    .catch(err => {
        console.error('Error seeding database:', err);
        db.close();
    });