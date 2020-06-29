let express=require('express');
let router=express.Router();
let {getUserCount}=require('../controller/userinfo/userInfo_controller');

/**
 * 获取用户的数量
 */
router.all('/getUserCount',(req,res,next)=>{
    getUserCount(req.query,data=>{
        res.json(data);
    })
})

module.exports=router;