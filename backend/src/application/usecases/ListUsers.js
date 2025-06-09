class ListUsers {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    // Retorna todos os usuários
    return await this.userRepository.findAll();
  }
}

module.exports = ListUsers;