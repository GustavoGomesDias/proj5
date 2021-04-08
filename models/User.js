const knex = require("../database/connection");
const bcrypt = require("bcrypt");

// Poderiamos chamar esse arquivo de Service também

class User {

    async findAll(){
        try{
            const result = await knex.select(["id", "email", "name", "role"]).table("users");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            const result = await knex.select(["id", "email", "name", "role"]).where({ id: id }).table("users");
            if(result.length > 0){
                return result[0];
            }else{
                return undefined
            }
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async new(email, password, name){
        try{
            const hash = await bcrypt.hash(password, 10);
                
            await knex.insert({ email, password: hash, name, role: 0 }).table("users");
        }catch(err){
            console.log(err)
        }
    }

    async findEmail(email){
        try{
            const result = await knex.select("*").from("users").where({ email: email });
                
            if(result.length > 0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
            return true;
        }
    }

    async update(id, email, name, role){
        const user = await this.findById(id);
        let editUser = {};
        if(user != undefined){
            
            if(email != undefined){
                if(email != user.email){
                    const result = await this.findEmail(email);
                    if(!result){
                        editUser.email = email;
                    }else{
                        return {status: false, err: "Email já cadastrado!"};
                    }
                }
            }

            if(name != undefined){
                editUser.name = name;
            }

            if(role != undefined){
                editUser.role = role;
            }

            try{
                await knex
                    .update(editUser)
                    .where({ id: id })
                    .table("users");

                return {status: true};
                
            }catch(err){
                return {status: false, err: err};
            }

        }else{
            return {status: false, err: "Usuário não existe!"};
        }
    }
}

module.exports = new User();