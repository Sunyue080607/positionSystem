const express=require('express');
const cors=require('cors')
const bodyParser=require('body-parser')
const expressJWT=require('express-jwt')
const privateKey='skey'

//引入路由
const loginRouter=require('./routes/login');
const accountManagerRouter=require('./routes/home');


const app=express();

//数据处理
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//运行跨域
app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
});

//JWT鉴权
app.use(expressJWT({
    secret: privateKey
}).unless({
    path: ['/','/login','/register']  //除了这个地址，其他的URL都需要验证
}));


//校检token失败的处理
app.use(function (err, req, res, next) {
    console.log('错误'+err)
    if (err.name === 'UnauthorizedError') {
        //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
        res.status(401).send('invalid token...');
    }
});


app.use('/',loginRouter);
app.use('/home',accountManagerRouter);




app.listen(3000,(req,res)=>{
    console.log('LocalHost3000 is running')
})