const express=require('express');
const router=express.Router();
const {querySql}=require('../db/index')

router.use('/accountManager',(req,res)=>{
    const sql='select * from User'
    querySql(sql).then((result)=>{
        console.log(result)
        res.send(result)
    })
})

module.exports=router