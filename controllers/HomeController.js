class HomeController{

    async index(req, res){
        res.send("APP EXPRESS! - Guia do programador");
    }

    async validate(req, res){
        res.status(200);
        res.send("ok");
    }

}

module.exports = new HomeController();