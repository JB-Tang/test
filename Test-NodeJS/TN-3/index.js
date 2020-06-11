var express=require('express'); //引入express模块
var app=express();

//引入 bodyParser方法
const bodyParser=require('body-parser');

//post参数解析
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))

//parse application/json
app.use(bodyParser.json());

//路由相关
const home=require('./router/home');    //定义路由
app.use('/home',home) //使用路由

//定义静态资源路径文件夹
app.use('/static',express.static('./static'));


//定义方法
// app.get('/',(req,res)=>{
//     res.send("Hello World!")
// });

// app.post('/post',(req,res)=>{
//     console.log(req.body);
//     res.send("Hello World!")
// })

//定义端口，此处所用为3000端口，可自行更改
var server=app.listen(3000,()=>{
    var host=server.address().address;
    var port=server.address().port;

    console.log('Example app listening at http://%s:%s',host,port);
})