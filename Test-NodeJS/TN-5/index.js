const {app,pool}=require('./connect')
const login=require('./login/index')

app.all('*',(req,res,next)=>{
    //这里处理全局拦截，一定要写在最上面，不然会被其他接口匹配到而没有执行next导致捕捉不到
    next();
})

app.all('/',(req,res)=>{
    pool.getConnection((err,conn)=>{
        res.json({a:"b"})
        conn.release();  //释放链接池，等待别的链接使用
    })
})

app.use('/login',login)

app.listen('80',()=>{
    console.log("服务启动");
})