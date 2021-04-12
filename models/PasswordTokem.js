const knex = require('../database/connection');
const User = require('./User');
const { v4: uuidv4 } = require('uuid');

class PasswordToken {
    async create(email){
        const user = await User.findByEmail(email);

        if(user != undefined){
            try{
                const token = uuidv4().split("-").join("");

                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token:  token// EStudar o UUID pra mudar isso
                }).table("passwordtokens");
                return { status: true, token: token };
            }catch(err){
                console.log(err);
                return { status: false, err: err }    
            }
        }else{
            return { status: false, err: "E-mail inválido ou não cadastrado." };
        }
    }
}

module.exports = new PasswordToken();