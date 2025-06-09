class User {
    constructor(id, name, email, password, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Method to check if the user is an admin
    isAdmin() {
        return this.role === 'admin';
    }

    // Method to check if the user is a collaborator
    isCollaborator() {
        return this.role === 'collaborator';
    }
}

export default User;