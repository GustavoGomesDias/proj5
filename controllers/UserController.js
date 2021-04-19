const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../secrets/secret");

class UserController{

    async index(req, res){
        const users = await User.findAll();
        res.json(users);
        res.status(200);
    }

    async findUser(req, res){
        const id = req.params.id;
        const user = await User.findById(id);
        
        if(user == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200);
            res.json(user);
        }
    }

    async create(req, res){
        const { email, name, password } = req.body;

        if(email == undefined || name == undefined || password == undefined){
            res.status(400);
            res.json({ err: "Informações inválidas" });
            return;
        }
        if(email == "" || name == "" || password == ""){
            res.status(400);
            res.json({ err: "Informações inválidas" });
            return;
        }
        
        if(email == undefined || name == undefined || password == undefined){
            res.status(400);
            res.json({ err: "Informações inválidas" });
            return;
        }

        if(email == " " || name == " " || password == " "){
            res.status(400);
            res.json({ err: "Informações inválidas" });
            return;
        }

        const emailExists = await User.findEmail(email);
        if(emailExists){
            res.status(406);
            res.json({ err: "E-mail já cadastrado." });
            return;
        }

        await User.new(email, password, name);
        res.status(200);
        res.send("Usuário cadastrado!");
    }

    async edit(req, res){
        const { id, name, role, email } = req.body;
        const result = await User.update(id, email, name, role);

        if(result != undefined){
            if(result.status){
                res.status(200)
                res.send("Usuário atualizado");
            }else{
                res.status(406)
                res.send(result.err);
            }
        }else{
            res.status(406)
            res.send(result.err);
        }
    }

    async remove(req, res){
        const id = req.params.id;

        const result = await User.delete(id);

        if(result.status){
            res.status(200);
            res.send("Usuário deletado com sucesso");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async recoverPassword(req, res){
        const email = req.body.email;
        const result = await PasswordToken.create(email);

        if(result.status){
            res.status(200);
            res.send(result.token);
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async changePassword(req, res){
        const token = req.body.token;
        const password = req.body.password;

        const isTokenValid = await PasswordToken.validate(token);

        if(isTokenValid.status){
            
            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);

            res.status(200);
            res.send("Senha alterada!");

        }else{
            res.status(406);
            res.send("Token inválido.");
        }
    }

    async longin(req, res){
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if(user != undefined){
            const result = await bcrypt.compare(password, user.password);

            if(result){

                const token = jwt.sign({ email: user.email, role: user.role }, secret);

                res.status(200);
                res.json({ token: token });

            }else{
                res.status(406);
                res.json({ err: "Senha incorreta" });
            }
        }else{
            res.status(406);

            res.json({ status: false, err: "Usuário não existe." });
        }
    }
};

module.exports = new UserController();