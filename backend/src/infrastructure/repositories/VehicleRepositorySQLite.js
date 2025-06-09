const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');
const VehicleRepository = require('../../domain/repositories/VehicleRepository');

class VehicleRepositorySQLite extends VehicleRepository {
    create(vehicle) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO vehicles (name, model, owner) VALUES (?, ?, ?)';
            db.run(sql, [vehicle.name, vehicle.model, vehicle.owner], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve({ id: this.lastID, ...vehicle });
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM vehicles WHERE id = ?';
            db.get(sql, [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM vehicles';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
}

module.exports = VehicleRepositorySQLite;