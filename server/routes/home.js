const express=require('express');
const router=express.Router();
const {querySql}=require('../db/index')
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


router.use('/accountManager',(req,res)=>{
    const sql='select * from User'
    querySql(sql).then((result)=>{
        res.send(result)
    });
});

router.use('/deleteAccount',(req,res)=>{
    console.log(req.body.username);
    const sql='DELETE FROM User where username = "'+req.body.username+'"';
    querySql(sql).then(()=>{
        console.log('删除成功')
        res.send('delete success')
    })

})



router.use('/addLocation',(req,res)=>{
    console.log('---------------------');
    console.log(req.body.xPosition);
    const connection=connect();
    const  addSql = 'INSERT INTO WIFIposition(xPosition,yPosition) VALUES(?,?)';
    //const  addSql = 'INSERT INTO User(username,password) VALUES(?,?)';
    const sqlParam=[req.body.xPosition,req.body.yPosition];
    console.log(sqlParam)
    new Promise((resolve, reject) => {
        try {
            connection.query(addSql,sqlParam,(err,results)=>{
                if(err) reject(err)
                else{
                    resolve(results)
                }
            })
        }catch (e) {
            reject(e)
        }finally {
            connection.end()
        }
    }).then(()=>{
        console.log('添加成功')
        res.send('添加数据成功')
    }).catch(e=>{
        console.log('有错误')
        res.status(500)
        console.log(e)
        console.log('-------------')
    })
});

router.use('/showMap',(req,res)=>{
    const sql='select * from WIFIposition'
    querySql(sql).then((result)=>{
        console.log(result)
        res.send(result)
    });
})

module.exports=router