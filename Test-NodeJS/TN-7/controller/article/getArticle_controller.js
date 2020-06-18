/**
 * 获取列表
 * @type {Connection}
 */
let _=require('lodash');
let DBHelp=require('../../config/DBHelp');
let getArticle=(data,success)=>{
    //SQL语句
    let SQL='SELECT * FROM websites';
    let counter=0
    let SQL_=SQL+' WHERE ';
    //多个条件时循环data去除key,val
    _.forEach(data,(key,val) => {
        if(counter>0){
            SQL=SQL+' AND '+val+' = '+key;
        }else{
            SQL=SQL_+val+'= '+key+' OR name LIKE %'+key+'%';
        }
        counter++
    });
    /**
     * resultData
     * @code:状态码
     * @data:data
     * @codeMessage:状态消息
     */
    const resultData={
        code:null,
        data:null,
        codeMessage:null
    }
    DBHelp(SQL,(error,result,fields)=>{
        if(error){
            resultData.error=error.message
        }
        resultData.code=200;
        resultData.data=result;
        resultData.codeMessage='success'
        success(resultData);
    })
}
let getArticleUrl=(data,success)=>{
    console.warn("getArticle_controller:data---",data)
    //SQL语句
    let SQL='SELECT url FROM websites';
    if(data.name){
        SQL=SQL+" WHERE name like '%"+data.name+"%'";
    }
    /**
     * resultData
     * @code:状态码
     * @data:data
     * @codeMessage:状态消息
     */
    const resultData={
        code:null,
        data:null,
        codeMessage:null
    }
    DBHelp(SQL,(error,result,fields)=>{
        if(error){
            resultData.error=error.message
        }
        resultData.code=200;
        resultData.data=result;
        resultData.codeMessage='success'
        success(resultData)
    })
    
}
module.exports={getArticle,getArticleUrl}