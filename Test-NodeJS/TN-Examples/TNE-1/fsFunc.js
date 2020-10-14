/**
 * fs模块
 */
var fs=require('fs');
const { argv0 } = require('process');

// 小文件拷贝
function copySmall(src,dst){
    fs.writeFileSync(dst,fs.readFileSync(src));
}
// 大文件拷贝
function copyBig(src,dst){
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}



function main(argv){
    copySmall(argv[0],argv[1]);
    copyBig(argv[0],argv[1]);
}

// main(process.argv.slice(2))




/**
 * Stream
 */
var rs=fs.createReadStream(pathname);
rs.on('data',function(chunk){
    doSomething(chunk);
})
rs.on('end',function(){
    cleanUp();
})
// 上边的代码中data事件会源源不断地被触发，不管doSomething函数是否处理得过来。代码可以继续做如下改造，以解决这个问题。
var rs=fs.createReadStream(src);
rs.on('data',function(chunk){
    rs.pause();
    doSomething(chunk,()=>{
        rs.resume()
    })
})
rs.on('end',()=>{
    cleanUp();
})

//只读流和只写流的交互
var rs=fs.createReadStream(src);
var ws=fs.createWriteStream(dst);
rs.on('data',(chunk)=>{
    ws.write(chunk);
})
rs.on('end',()=>{
    ws.end();
})
//以上代码如果写入速度跟不上读取速度的话，只写数据流内部的缓存会爆仓
//我们可以根据.write方法的返回值来判断传入的数据是写入目标了，还是临时放在了缓存了，并根据drain事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据了。
var rs=fs.createReadStream(src);
var ws=fs.createWriteStream(dst);
rs.on('data',(chunk)=>{
    if(ws.write(chunk)===false){
        rs.pause();
    }
})
rs.on('end',()=>{
    ws.end();
})
ws.on('drain',()=>{
    rs.resume();
})
//在NodeJS中直接使用了.pipe方法来处理




/**
 * fs模块中的异步与同步方法
 */
//异步
fs.readFile(pathname,(err,data)=>{
    if(err){
        //Deal with error.
    }else{
        //Deal with data.
    }
})
//同步
try{
    var data=fs.readFileSync(pathname);
    //Deal with data.
}catch(err){
    //Deal with error.
}




/**
 * 遍历目录
 */
//递归算法
function factorial(n){
    if(n===1){
        return 1;
    }else{
        return n*factorial(n-1);
    }
}
//同步遍历
function travelSync(dir,callback){
    fs.readdirSync(dir).forEach((file)=>{
        var pathname=path.join(dir,file);
        if(fs.statSync(pathname).isDirectory()){
            travelSync(pathname,callback);
        }else{
            callback(pathname);
        }
    })
}
travelSync('/home/user',(pathname)=>{
    console.log(pathname);
})
//异步遍历
function travel(dir,callback,finish){
    fs.readdir(dir,(err,files)=>{
        (function next(i){
            if(i<files.length){
                var pathname=path.join(dir,files[i]);
                fs.stat(pathname,(err,stats)=>{
                    if(stats.isDirectory()){
                        travel(pathname,callback,()=>{
                            next(i+1);
                        })
                    }else{
                        callback(pathname,()=>{
                            next(i+1);
                        })
                    }
                })
            }else{
                finish && finish();
            }
        }(0))
    })
}




/**
 * 文本编码
 */
// BOM的移除
function readText(pathname){
    var bin=fs.readFileSync(pathname);
    if(bin[0]===0xEF&&bin[1]===0xBB&&bin[2]===0xBF){
        bin=bin.slice(3);
    }
    return bin.toString('utf-8');
}
//GBK转UTF8
var iconv=require('iconv-lite');
function readGBKText(pathname){
    var bin=fs.readFileSync(pathname);
    return iconv.decode(bin,'gbk')
}
//单字节编码
function replace(pathname){
    var str=fs.readFileSync(pathname,'binary');
    str=str.replace('foo','bar');
    fs.writeFileSync(pathname,str,'binary');
}
