/**
 * 数据添加
 * @type {Connection}
 */
let DBHelp=require('../../config/DBHelp');
let addArticle=(data,success)=>{
    let SQL='INSERT INTO websites (name,url,alexa,country) VALUES (?,?,?,?);';
    let SQL_DATA=[data.name,data.url,data.alexa,data.country]
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
    DBHelp(SQL,SQL_DATA,(error,result,fields)=>{
        if(error){
            resultData.error=err.message
        }
        resultData.code=200;
        resultData.data={};
        resultData.codeMessage='新增数据成功！'
        success(resultData);
    })
}
module.exports=addArticle