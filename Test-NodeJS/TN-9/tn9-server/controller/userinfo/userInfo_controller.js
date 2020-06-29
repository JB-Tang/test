/**
 * 用户的基本信息
 * @type {Connection}
 */
let _=require('lodash')
let DBHelp=require('../../config/DBHelp');

//获取数据库中用户的数量
let getUserCount=(data,success)=>{
    //SQL语句
    let SQL ='SELECT COUNT(*) FROM user';
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

module.exports={getUserCount};
