const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const MaintenanceRepository = require('../../domain/repositories/MaintenanceRepository');

class MaintenanceRepositorySQLite extends MaintenanceRepository {
    constructor(db) {
        super();
        this.db = db;
    }

    async create(maintenance) {
        const { description, vehicle_id, date, status } = maintenance;
        const result = await this.db.run(
            'INSERT INTO maintenances (description, vehicle_id, date, status) VALUES (?, ?, ?, ?)',
            [description, vehicle_id, date, status]
        );
        return { id: result.lastID, ...maintenance };
    }

    async getById(id) {
        return await this.db.get('SELECT * FROM maintenances WHERE id = ?', [id]);
    }

    async getAll() {
        return await this.db.all('SELECT * FROM maintenances');
    }
}

module.exports = MaintenanceRepositorySQLite;