const jwt=require('jsonwebtoken');
const jwtauthMW=(req,res,next)=>{
    //extract the jwt token from the request headers
    const token=req.headers.authorization.split('')[1];
    if(!token)return res.status(401).json({error:'unauthorized'});
    try {
        //verify JWT token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //attach user info to request object
        req.user=decoded
        next();
    } catch (error) {
        console.log(err);
        res.status(401).json({error:'invaild token'})
    }
}


//function to genrate JWT token
const generateToken=(userdata)=>{
    //generate token by user data
    return jwt.sign(userdata,process.env.JWT_SECRET);
}

module.exports={jwtauthMW ,generateToken}