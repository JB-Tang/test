let DB_MYSQL=require('mysql');
let DB_CONFIG=require('./dbConfig');

/**
 * 数据库连接池
 * @type {pool}
 */
let pool=DB_MYSQL.createPool({
    host:DB_CONFIG.database.HOST,
    user:DB_CONFIG.database.USERNAME,
    password:DB_CONFIG.database.PASSWORD,
    database:DB_CONFIG.database.DATABASE,
    port:DB_CONFIG.database.PORT
});

/**
 * 通用方法
 * @param sql
 * @param options
 * @param callback
 */
let query=(sql,options,callback)=>{
    pool.getConnection((error,connection)=>{
        if(error){
            callback(err,null,null)
        }else{
            connection.query(sql,options,(error,result,fields)=>{
                //释放连接
                connection.release();
                //事件驱动回调
                callback(error,result,fields);
            })
        }
    })
}

module.exports=query;