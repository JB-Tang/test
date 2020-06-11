/**
 * 测试get
 */
// const express=require('express');
// const app=express();
// app.listen(80,()=>{
//     console.log('服务启动');
// })
// app.get('/',(req,res)=>{
//     res.json('helloWorld')
// })
// app.get('/',(req,res)=>{
//     res.send('<div style="color:blue">hello world</div>')
// }) 

/**
 * 测试post
 */
// const express=require('express');
// const app=express();
// app.listen(80,()=>{
//     console.log('服务启动');
// })
// app.post('/',(req,res)=>{
//     res.json('helloWorld')
// })

/**
 * 测试all
 */
// const express=require('express');
// const app=express();
// app.listen(80,()=>{
//     console.log('服务启动');
// })
// app.all('/',(req,res)=>{
//     res.json('helloWorld')
// })

/**
 * 测试拦截
 */
// const express=require('express');
// const app=express();
// app.listen(80,()=>{
//     console.log('服务启动');
// })
// var login=false;
// app.all('*',(req,res)=>{
//     if(!login){
//         return res.json('未登录');
//     }
//     next();
// })
// app.post('/test',(req,res)=>{
//     res.json('test')
// })

/**
 * 测试有路径有参数
 */
// const bodyParser=require('body-parser');    //解析参数
// const express=require('express');
// const app=express();
// app.use(bodyParser.json()); //json请求
// app.use(bodyParser.urlencoded({extended:false})); //表单请求
// app.listen(80,()=>{
//     console.log("服务启动");
// })
// var login=true;
// app.all('*',(req,res,next)=>{
//     if(!login){
//         return res.json('未登录');
//     }
//     next();
// })
// app.post('/test',(req,res)=>{
//     return res.json({query:req.query,data:req.params,json:req.body})
// })
// app.post('/test/:data',(req,res)=>{
//     return res.json({query:req.query,data:req.params,json:req.body})
// })

/**
 * 测试跨域问题
 */
// const cors=require('cors');
// const bodyParser=require('body-parser');    //解析参数
// const express=require('express');
// const app=express();
// app.use(cors());    //解决跨域
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));   //表单请求
// app.listen(80,()=>{
//     console.log("服务启动");
// });
// var login=true;
// app.all('*',(req,res,next)=>{
//     if(!login){
//         return res.json('未登录');
//     }
//     next();
// })
// app.post('/test/:data',(req,res)=>{
//     return res.json({query:req.query,data:req.params,json:req.body})
// })

/**
 * 测试连接数据库
 */
const express=require('express')
const mysql=require('mysql');
const cors=require('cors');
const bodyParser=require('body-parser');  //解析参数
const app=express();
const router=express.Router();
const option={
    host:'localhost',
    user:'root',
    password:'xxxxxxxxx',
    port:'3306',
    database:'test',
    connectTimeout:5000,    //连接超时
    multipleStatements:false,   //是否允许一个query中包含多条sql语句
}
app.use(cors());    //解决跨域
app.use(bodyParser.json()); //json请求
app.use(bodyParser.urlencoded({extended:false}));   //表单请求
app.listen(80,()=>{
    console.log("服务启动");
});

const conn=mysql.createConnection(option);
app.all('/login',(req,res)=>{
    conn.query('SELECT * FROM student',(e,r)=>{
        res.json(new Result(r))
    })
})

function Result(data){
    return {
        code:1,
        msg:'success!',
        data:data
    }
}