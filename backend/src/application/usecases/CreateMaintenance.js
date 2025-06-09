class CreateMaintenance {
    constructor(maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }

    async execute(maintenanceData) {
        const { description, vehicle_id, date, status } = maintenanceData;

        // Validate input data
        if (!description || !vehicle_id || !date || !status) {
            throw new Error('All fields are required');
        }

        // Create a new maintenance record
        const maintenance = {
            description,
            vehicle_id,
            date,
            status,
        };

        return await this.maintenanceRepository.create(maintenance);
    }
}

export default CreateMaintenance;