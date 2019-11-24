exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(401).send('로그인을 하세요');
};

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return next();
    }
    return res.status(401).send('로그아웃후 이용하세요');
}