const jwt = require("jsonwebtoken");
const secret = require("../secrets/secret");

module.exports = function(req, res, next){
    const authToken = req.headers['authorization'];
    
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        const token = bearer[1];

        try{
            const decoded = jwt.verify(token, secret);
            if(decoded.role == 1){
                next();
            }else{
                res.status(403);
                res,send("Você não tem permissão apra isso.");
                return;
            }
        }catch(err){
            res.status(403);
            res.send("Você não está autenticado.");
            return;
        }

    }else{
        res.stauts(403);
        res.send("Você não está autenticado.");
    }
}