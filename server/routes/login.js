const express=require('express');
const router=express.Router();
const db=require('../config/db');

router.use('/',(req,res)=> {
    const sql = "select * from User"
    db.query(sql, (err, result) => {
        for(let item of result){
            if(item.username===req.body.username&&item.password===req.body.password){
                res.send(200)
            }
        }
    })
})


module.exports=router