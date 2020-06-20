const express=require("express");
const mysql=require("mysql");
const cors=require("cors");
const bodyParser=require("body-parser");
const app=express();
const router=express.Router();
const option={
    host:'localhost',
    user:'jbTang',
    password:'123456',
    port:'3306',
    database:'test',
    connectTimeout:5000,    //连接超时
    multipleStatements:false,   //是否允许一个query中包含多条sql语句
    waitForConnections:true,    //当无连接池可用时，等待（true）还是抛错（false）
    connectionLimit:100,    //连接数限制
    queueLimit:0    //最大连接等待数（0为不限制）
}
app.use(cors());    //解决跨域
app.use(bodyParser.json()); //json请求
app.use(bodyParser.urlencoded({extended:false}));   //表单请求

let pool;
repool();

//断线重连机制
function repool(){
    pool=mysql.createPool(option);  //创建连接池
    pool.on('error',err=>err.code==='PROTOCOL_CONNECTION_LOST' && setTimeout(repool,2000))
}

module.exports={pool,router,app};