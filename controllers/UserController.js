const User = require("../models/User");

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
};

module.exports = new UserController();