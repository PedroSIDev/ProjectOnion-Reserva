class Vehicle {
    constructor(id, name, model, owner, maintenanceHistory = []) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.owner = owner; // user_id
        this.maintenanceHistory = maintenanceHistory; // array of maintenance records
    }

    addMaintenance(maintenance) {
        this.maintenanceHistory.push(maintenance);
    }

    getMaintenanceHistory() {
        return this.maintenanceHistory;
    }
}

export default Vehicle;