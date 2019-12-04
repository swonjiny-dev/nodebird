const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const {isLoggedIn , isNotLoggedIn} = require('./middlewares');

const router = express.Router();

// 현재 로그인했던 사용자 정보 요청
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
                // {
                //     model : db.Post,
                //      as: 'Posts',
                //     attributes : ['id']
                // },
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
        // 가입유무 확인
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
        // 가입처리
        const hash = await bcrypt.hash(req.body.password , 10);
        await db.User.create({
            email : req.body.email,
            password : hash,
            nickname : req.body.nickname,
        });
        // 로그인 시키기
        // 패스포트 local 전략적용 - passport - local.js
        passport.authenticate('local',(error,user,info)=>{
            if(error){
                console.error(error);
                return next(err);
            }

            if(info){
                return req.status(401).send(info.reason);
            }
            // req.login passport 에 의해서 적용된
            return req.login(user , async(error)=>{
                
                if(error){
                    console.error(error);
                    return next(error);
                }
                // 세션정보는 id 만 존재하므로 
                const userInfo = await db.User.findOne({
                    where : {id : user.id},
                    attributes : ['id','nickname','email'],
                     include :[
                        // 작성글정보
                        // {
                        //     model : db.Post,
                        //      as: 'Posts',
                        //     attributes : [id]
                        // },
                         // 유저의 팔로잉한 정보
                         {
                             model : db.user,
                             attributes : ['id'],
                             as : 'Followings'
                         },
                         // 유저을 팔로잉한 팔로워들 정보
                         {   
                             model : db.user,
                             attributes : ['id'],
                             as : 'Follwings',
                         }
                     ]
                });
                return res.json(userInfo);
            });
        })(req, res, next);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 로그린 요청
router.post('/login' ,isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local',(error,user,info)=>{
        if(error){
            console.error(error);
            return next(err);
        }

        if(info){
            return req.status(401).send(info.reason);
        }
        // req.login passport 에 의해서 적용된
        return req.login(user , async(error)=>{
            if(error){
                console.error("111111111");
                console.error(error);
                return next(error);
            }
            // 세션정보는 id 만 존재하므로 
            const userInfo = await db.User.findOne({
                where : {id : user.id},
                attributes: ['id', 'email', 'nickname'],
                include :[
                    {
                        model: db.Post,
                        attributes: ['id'],
                    }, {
                        model: db.User,
                        as: 'Followings',
                        attributes: ['id'],
                    }, {
                        model: db.User,
                        as: 'Followers',
                        attributes: ['id'],
                    }
                ]
            });
            return res.json(userInfo);
        });
    })(req, res, next);
});

// 로그아웃
router.post('/logout' , isLoggedIn , (req , res , next)=>{
    if(req.isAuthenticated()){
        req.logOut();
        return res.status(200).send('로그아웃이 정상적으로 처리되었습니다.');
    }
});

// 글정보 얻어오기
router.get('/:id/posts' ,async(req,res,next)=>{
    try {
        const user = await db.User.findOne({
            where : {id : req.params.id},
        });
        res.send(req.params.id);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch('/nickname', isLoggedIn,async(req, res, next) => {
    try {
       await console.log(req.user);
        

        await db.User.update({
            nickname: req.body.nickname,
        }, {
            where: {
                id: req.user.id
            },
        });
        res.send(req.body.nickname)
    } catch (error) {
        console.error(error);
        next(error);
        
    }
})

module.exports = router;