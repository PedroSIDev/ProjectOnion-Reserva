class Maintenance {
    constructor(id, description, vehicleId, date, status) {
        this.id = id;
        this.description = description;
        this.vehicleId = vehicleId;
        this.date = date;
        this.status = status;
    }

    // Method to update the status of the maintenance
    updateStatus(newStatus) {
        this.status = newStatus;
    }

    // Method to get a summary of the maintenance
    getSummary() {
        return {
            id: this.id,
            description: this.description,
            vehicleId: this.vehicleId,
            date: this.date,
            status: this.status
        };
    }
}

export default Maintenance;