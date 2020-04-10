const express=require('express');
const cors=require('cors')
const bodyParser=require('body-parser')

const privateKey='skey'

//引入路由
const loginRouter=require('./routes/login');
const accountManagerRouter=require('./routes/home');

const app=express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
//运行跨域
app.use(cors())
app.use(expressJWT({
    secret: PrivateKey
}).unless({
    path: ['/login']  //除了此地址，其他的URL都需要验证
}));

app.use((req,res,next)=>{
    console.log(req)
    next()
})
app.use('/',loginRouter)
app.use('/home',accountManagerRouter)




app.listen(3000,(req,res)=>{
    console.log('LocalHost3000 is running')
})