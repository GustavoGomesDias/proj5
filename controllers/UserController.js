class UserController{
    async create(req, res){
        const { email, name, password } = req.body;

        if(email == undefined || name == undefined || password == undefined){
            res.status(400);
            res.json({ err: "Informações inválidas" });
        }else{
            res.status(200);
            res.send("Usuário cadastrado com sucesso!");
        }

    }
};

module.exports = new UserController();