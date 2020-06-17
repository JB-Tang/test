let express=require('express');
let router=express.Router();
let getArticle=require('../controller/article/getArticle_controller');
let addArticle=require('../controller/article/addArticle_controller');
/**
 * 数据查询
 */
router.get('/article/list/get',(req,res,next)=>{
  getArticle(req.query,data=>{
    res.end(JSON.stringify(data));
  })
});
/**
 * 数据新增
 * @type {Router|router}
 * request.body.XX
 */
router.all('/article/list/add',(req,res,next)=>{
  req.body={
    name:'测试',
    url:'http://www.test.aa',
    alexa:'32',
    country:'CN'
  }
  addArticle(req.body,data=>{
    res.end(JSON.stringify(data));
  })
});
module.exports=router;
