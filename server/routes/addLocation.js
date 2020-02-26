const express=require('express');
const router=express.Router();
require('../config/db')

router.use('/home/addLocation',(req,res)=>{
    const sql=
    console.log(req.body)
})

module.exports=router