const jwt = require("jsonwebtoken")

const verifytoken = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if( !authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "ไม่ได้เข้าสู่ระบบ"})  
    }

    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token, "secret123")
        req.user = decoded;
        console.log("Token decoded:", req.user)
        next()
    }catch (err){
        return res.status(403).json({ message:" Token ไม่ถูกต้อง"})
    }
}

module.exports = verifytoken