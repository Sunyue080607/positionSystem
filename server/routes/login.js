const express=require('express');
const router=express.Router();
const db=require('../config/db')


router.use('/',(req,res)=>{
    console.log(req.body)
    res.send('helloworld')
})


module.exports=router