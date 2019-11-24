const passport = require('passport');
const bcrypt = require('bcrypt');
const {Strategy:LocalStrategy} = require('passport-local');
const db = require('../models');

module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    } , async (email, password , done)=>{
        try {
            const user = await db.User.findOne({where : {email}});
            if(!user){
                return done(null,false,{reason : '이메일은 사용자의 이메일이 아닙니다.'});
            } 
            const result = await bcrypt.compare(password, user.password);
            if(result) {
                return done(null,user);
            }else{
                return done(null,false,{reason : '사용자정보가 다릅니다.'});
            }
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }
    
    ));
}