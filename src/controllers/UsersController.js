const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const database = await sqliteConnection();
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])
        
        if(checkUserExist){
            throw new AppError("Este email já está em uso!");
        }

        const hashedPassword = await hash(password, 8);

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        return response.status(201).json();
    }

    async update(request, response) {
        const {name, email} = request.body;
        const user_id = request.user.id;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]); 

        if(!user) {
            throw new AppError("Usuário não encontrado!");
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este email já está em uso!");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        update_at = DATETIME('now')
        WHERE id = ?`, 
        [user.name, user.email, user_id]
        );

        return response.json();
    }
}

module.exports = UsersController;