const knex = require("../database/connection");
const bcrypt = require("bcrypt");

// Poderiamos chamar esse arquivo de Service também

class User {
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
}

module.exports = new User();