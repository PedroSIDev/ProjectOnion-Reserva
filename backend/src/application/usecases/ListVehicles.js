class ListVehicles {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    async execute() {
        return await this.vehicleRepository.getAll();
    }
}

export default ListVehicles;