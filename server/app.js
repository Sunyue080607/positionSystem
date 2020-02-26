const express=require('express');
const app=express();
const cors=require('cors')
const bodyParser=require('body-parser')


//运行跨域
app.use(cors())
app.use(bodyParser())

//引入路由
const loginRouter=require('./routes/login');
const addLocation=require('./routes/addLocation');

app.use('/addLocation',addLocation)
app.use('/',loginRouter)

app.use('/home',(req,res,next)=>{

})


app.listen(3030,(req,res)=>{
    console.log('localhost3000 is running')
})