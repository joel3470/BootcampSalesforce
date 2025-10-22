const UserService = require('../../../application/services/UserService');

class UserController {
    // Obtiene lista de usuarios
    static async fetchUsers(req, res) {
        try {
            const users = await UserService.fetchUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    // Busca un usuario por ID
    static async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;