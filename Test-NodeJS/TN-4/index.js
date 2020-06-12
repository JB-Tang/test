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
// const express=require('express')
// const mysql=require('mysql');
// const cors=require('cors');
// const bodyParser=require('body-parser');  //解析参数
// const app=express();
// const router=express.Router();
// const option={
//     host:'localhost',
//     user:'root',
//     password:'xxxxxxxxx',
//     port:'3306',
//     database:'test',
//     connectTimeout:5000,    //连接超时
//     multipleStatements:false,   //是否允许一个query中包含多条sql语句
// }
// app.use(cors());    //解决跨域
// app.use(bodyParser.json()); //json请求
// app.use(bodyParser.urlencoded({extended:false}));   //表单请求
// app.listen(80,()=>{
//     console.log("服务启动");
// });

// const conn=mysql.createConnection(option);
// app.all('/login',(req,res)=>{
//     conn.query('SELECT * FROM student',(e,r)=>{
//         res.json(new Result(r))
//     })
// })

// function Result(data){
//     return {
//         code:1,
//         msg:'success!',
//         data:data
//     }
// }

/**
 * 测试使用构造函数封装数据库连接
 */
// const express=require('express');
// const mysql=require('mysql');
// const cors=require('cors');
// const bodyParser=require('body-parser');  //解析参数
// const app=express();
// const router=express.Router();
// const option={
//     host:'localhost',
//     user:'root',
//     password:'xxxxxxxx',
//     port:'3306',
//     database:'test',
//     connectTimeout:5000,    //连接超时
//     multipleStatements:false,   //是否允许一个query中包含多条sql语句
// }
// app.use(cors());  //解决跨域
// app.use(bodyParser.json()); //json请求
// app.use(bodyParser.urlencoded({extended:false}));   //表单请求
// app.listen(80,()=>{
//     console.log("服务启动");
// })

// var conn=mysql.createConnection(option);
// app.all('/login',(req,res)=>{
//     conn.connect();
//     conn.query('SELECT * FROM student',(e,r)=>{
//         res.json(r)
//     });
//     conn.end();
// })

/**
 * 测试使用构造函数的重连机制
 */
// const express=require('express');
// const mysql=require('mysql');
// const cors=require("cors");
// const bodyParser=require("body-parser");
// const app=express();
// const router=express.Router();
// const option={
//     host:'localhost',
//     user:'root',
//     password:'xxxxxxxxx',
//     port:'3306',
//     database:'test',
//     connectTimeout:5000,    //连接超时
//     multipleStatements:false,   //是否允许一个query中包含多条sql语句
// }
// app.use(cors());    //解决跨域
// app.use(bodyParser.json());  //json请求
// app.use(bodyParser.urlencoded({extended:false}));   //表单请求
// app.listen(80,()=>{
//     console.log("服务启动");
// })

// var conn;
// reconn();

// app.all('/login',(req,res)=>{
//     conn.connect();
//     conn.query('SELECT * FROM student',(e,r)=>{
//         res.json(r)
//     })
//     // conn.end();  //此处如果添加end()的话，那么只能连接数据库一次
// })

// //断线重连机制
// function reconn(){
//     conn=mysql.createConnection(option);
//     conn.on('error',err=>err.code==='PROTOCOL_CONNECTION_LOST' && setTimeout(reconn,2000))
// }

/**
 * 测试使用数据库连接池
 */
const express=require("express");
const mysql=require("mysql");
const cors=require("cors");
const bodyParser=require("body-parser");
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
    waitForConnections:true,    //当无连接池可用时，等待（true）还是抛错（false）
    connectionLimit:100,    //连接数限制
    queueLimit:0,   //最大连接等待数（0为不限制）
}
app.use(cors());    //解决跨域
app.use(bodyParser.json()); //json请求
app.use(bodyParser.urlencoded({extended:false}));   //表单请求
app.listen(80,()=>{
    console.log("服务启动")
})

var pool
repool()

app.all('/login',(req,res)=>{
    // 方案一：直接使用
    pool.query('SELECT * FROM student',(e,r)=>{
        res.json(r)
    })
    //方案二：从连接池中取一个连接
    pool.getConnection((err,conn)=>{
        conn.query('SELECT * FROM student',(e,r)=>{
            res.json(r)
        })
        conn.release();
    })
})

//断线重连机制
function repool(){
    pool=mysql.createPool(option); //创建连接池
    pool.on('error',err=>err.code==='PROTOCOL_CONNECTION_LOST' && setTimeout(repool,2000))
}