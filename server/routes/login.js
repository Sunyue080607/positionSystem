const express=require('express');
const router=express.Router();
const {querySql}=require('../db/index')
const jwt=require('jsonwebtoken');
const PrivateKey='skey'
const mysql=require('mysql');
const config=require('../db/config')

function connect() {
    return mysql.createConnection({
        host:config.host,
        user:config.user,
        password:config.password,
        database:config.database,
    })
}


//登陆部分
router.use('/login', (req,res)=> {
    console.log(`"前端登陆发送数据为" ${JSON.stringify(req.body)}`);
    let toBack = {
        "state": false,
        "message":"",
        "token":""
    };
    const sql = 'select * from User where username = "'+req.body.username+'"';
    querySql(sql).then((e)=>{
        console.log(`数据库中的查询结果为 ${JSON.stringify(e)}`);
        if (!(e.length > 0 && (req.body.password=== e[0].password))) {
            toBack.message = "wrong password"
            res.send(toBack)
            return;
        }
        toBack.state = true;
        toBack.message = "adminLogin success";
        toBack.token = jwt.sign({username: e[0].username}, PrivateKey, {expiresIn: 60 * 60 * 6});
        console.log(toBack)
        res.send(toBack)
    })
})

//注册部分
router.use('/register',(req,res)=>{
    console.log('---------------------');
    console.log(req.body.username);
    console.log('----------------------');
    const sql = 'select username from User where username = "'+req.body.username+'"';
    const toBack={
        state:false,
        message:''
    };
    querySql(sql).then((e)=>{
        console.log('---------------');
        console.log(e);
        console.log('---------------');
        if(e.length!==0){
            console.log('账号存在')
            toBack.state=true;
            toBack.message='账号已存在';
            res.send(toBack);
        }else{
            console.log('账号不存在，向数据库添加数据');
            const addsql='insert into User(username,password) values(?,?)'
            const sqlParam=[req.body.username,req.body.password];
            const connection=connect();
            new Promise((resolve,reject)=>{
                connection.query(addsql,sqlParam,(err,results)=>{
                    try {
                        if(err) reject(err)
                        else {
                            resolve(results)
                        }
                    }catch (e) {
                        reject(e)
                    }finally
                    {
                        connection.end()
                    }
                })
            }).then(()=>{
                console.log('添加数据成功')
                res.send(toBack)
            })

        }
    })

});

module.exports=router