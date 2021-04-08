const User = require("../models/User");

class UserController{
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