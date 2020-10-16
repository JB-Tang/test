/**
 * 调用终端命令简化目录拷贝
 */
var child_process=require('child_process');
var util=require('util');
const { Http2ServerRequest } = require('http2');
function copy(source,target,callback){
    child_process.exec(util.format('cp -r %s/* %s',source,target),callback);
}
copy('a','b',(err)=>{
    //...
})


/**
 * 获取命令行参数
 * 在NodeJS中可以通过process.argv获取命令行参数
 * node执行程序路径和主模块文件路径固定占据argv[0]和argv[1]两个位置
 * 第一个命令行参数从argv[2]开始。
 */
function main(argv){
    //...
}
main(process.argv.slice(2))


/**
 * 退出程序
 * 通常一个程序做完所有事情后就正常退出了，这时程序的退出状态码为0
 * 或者一个程序运行时发生异常后就挂了，这时程序的退出状态码不等于0
 * 如果我们在代码中捕获了异常，但是觉得程序不应该继续运行下去，需要立即退出，并且需要把退出状态码设置为指定数字，比如1，就可以进行如下操作
 */
try{
    //...
}catch(err){
    //...
    process.exit(1)
}


/**
 * 控制输入输出
 * NodeJS 标准输入流-stdin、标准输出流-stdout、标准错误流-stderr分别对应process.stdin、process.stdout和process.stderr
 * 第一个是只读数据流，后面两个是只写数据流，对它们的操作按照对数据流的操作方式即可。
 */
function log(){
    process.stdout.write(util.format.apply(util,arguments)+'\n');
}


/**
 * 降权
 * 在linux系统下，需要使用root权限才能监听1024以下端口，但是一旦完成端口监听后，继续让程序运行在root权限下会存在安全隐患，所以，最好把权限降下来。
 */
var http=require('http');
http.createServer(callback).listen(80,()=>{
    var env=process.env,
        uid=parseInt(env['SUDO_UID']||process.getuid(),10),
        gid=parseInt(env['SUDO_GID']||process.getgid(),10);
        process.setgid(gid);
        process.setuid(uid);
})
//如果是通过sudo获取root权限的，运行程序的用户UID和GID保存在环境变量SUDO_UID和SUDO_GID里面；如果是通过chmod+s方式获取root权限的，运行程序的用户UID和GID可直接通过process.getuid和process.getgid方法获取。
//process.setuid和process.setgid方法只接受number类型的参数
//降权时必须先降GID再降UID,否则顺序反过来的话就没权限更改程序的GID了。


/**
 * 创建子流程
 */
var child=child_process.spawn('node',['xxx.js']);
child.stdout.on('data',(data)=>{
    console.log('stdout:'+data);
})
child.stderr.on('data',(data)=>{
    console.log('stderr:'+data);
})
child.on('close',(code)=>{
    console.log('child process exited with code'+code);
})