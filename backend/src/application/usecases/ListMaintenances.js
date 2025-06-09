class ListMaintenances {
    constructor(maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }

    async execute() {
        return await this.maintenanceRepository.getAll();
    }
}

export default ListMaintenances;