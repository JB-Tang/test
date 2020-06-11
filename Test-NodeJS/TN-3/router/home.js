const express=require('express');
const router=express.Router();

router.use((req,res,next)=>{
    next();
})

router.get('/classic/lastest',(req,res)=>{
    var result={
        err:0,
        msg:'ok',
        data:{
            "name":"wangyi",
            "age":"99",
            "type":"man",
            "title":"pi"
        }
    }
    res.send(result)
})

router.post('/',(req,res)=>{
    res.send(req.body)
})
module.exports=router;