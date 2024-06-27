require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

const authenticate = (req, res, next) =>{
    const token = req.cookies.jwt;
    if(!token){
        return res.sendStatus(401);
    }
    jwt.verify(token, SECRET_KEY, (err, user) =>{
        if(err){
            return res.sendStatus(403)
        }
        req.user = user;
        next();
    })
}

module.exports = authenticate;