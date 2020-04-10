const express=require('express');
const router=express.Router();
const {querySql}=require('../db/index')
const jwt=require('jsonwebtoken');
let PrivateKey='skey'


//登陆部分
router.use('/login',async (req,res)=> {
    console.log(`"前端登陆发送数据为" ${JSON.stringify(req.body)}`);
    let toBack = {
        "state": false,
        "message": "",
        "token":""
    };
    const body=req.body
    const sql = 'select * from User where username = "'+req.body.username+'"';
    querySql(sql).then(async (e)=>{
        console.log(`数据库中的查询结果为 ${JSON.stringify(e)}`);
        if (!(e.length > 0 && (body.password=== e[0].password))) {
            toBack.message = "wrong password"
            res.send(toBack)
            return;
        }
        toBack.state = true;
        toBack.message = "adminLogin success";
        toBack.token = jwt.sign({username: e[0].username}, PrivateKey, {expiresIn: 60 * 60 * 6});
        res.send(toBack)
    })


})

module.exports=router