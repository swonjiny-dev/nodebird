const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const {isLoggedIn , isNotLoggedIn} = require('./middlewares');

const router = express.Router();

router.get('/' , isLoggedIn , (req , res, next)=>{
    const user = req.user;
    res.json(user);
});

// 사용자조회
router.get('/:id' ,async (req ,res,next)=>{
    try {
        const user = await db.User.findOne({
            where : { id: parseInt(req.params.id,10)},
            include : [
                {
                    model : db.Post,
                    attributes : ['id']
                },
                {
                    model : db.User,
                    as : 'Followers',
                    attributes : ['id'] 
                },{
                    model : db.User,
                    as : 'Followings',
                    attributes : ['id'] 
                }
            ]
        });
        res.json(user)
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 회원가입
router.post('/' , isNotLoggedIn , async(req , res, next)=>{
    try {
        const user = await db.User.findOne({
            where : {
                email : req.body.email,
            },
        });
        if(user){
            return res.status(403).json({
                reason : '이미가입된 회원입니다.'
            });
        }

        const hash = await bcrypt.hash(req.body.password , 10);
        await db.User.create({
            email : req.body.email,
            passwprd : hash,
            nickname : req.body.nickname,
        });
        passport.authenticate('local',(error,user,info)=>{
            if(error){
                console.error(error);
                return next(err);
            }

            if(info){
                return req.status(403).send(info.reason);
            }
            return req.login(user , async(error)=>{
                if(error){
                    console.error(error);
                    
                }
            });


        });

    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;