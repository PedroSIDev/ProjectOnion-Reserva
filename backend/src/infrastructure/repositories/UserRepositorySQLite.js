const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const UserRepository = require('../../domain/repositories/UserRepository');

class UserRepositorySQLite extends UserRepository {
    constructor(db) {
        super();
        this.db = db;
    }

    async create(user) {
        const { name, email, password, role } = user;
        const result = await this.db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]);
        return { id: result.lastID, ...user };
    }
    
    async findAll() {
    return new Promise((resolve, reject) => {
        this.db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
        });
    });
    }

    async getById(id) {
        const user = await this.db.get('SELECT * FROM users WHERE id = ?', [id]);
        return user || null;
    }

    async getAll() {
        const users = await this.db.all('SELECT * FROM users');
        return users;
    }
}

async function createUserRepository() {
    const db = await sqlite.open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    return new UserRepositorySQLite(db);
}

module.exports = { UserRepositorySQLite, createUserRepository };