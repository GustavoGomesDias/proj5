const User = require("../models/User");
const PasswordToken = require("../models/PasswordTokem");

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
};

module.exports = new UserController();