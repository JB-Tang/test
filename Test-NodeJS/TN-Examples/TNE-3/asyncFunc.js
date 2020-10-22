/**
 * 回调
 */
//异步编程的直接体现就是回调。异步编程依托于回调来实现，但是不能说使用了回调后程序就异步化了。
//代码1
function heavyCompute(n,callback){
    var count=0,i,j;
    for(i=n;i>0;--i){
        for(j=n;j>0;--j){
            count+=1;
        }
    }
    callback(count);
}
heavyCompute(10000,(count)=>{
    console.log(count)
})
console.log("hello")
//输出结果：100000000 hello
//从上面结果可以看出，回调函数仍然先于后续代码执行
//JS本身是单线程运行的，不可能在一段代码还未结束运行时去运行别的代码，因此也就不存在异步执行的概念


//如果某个函数做的事情是创建一个别的线程或流程，并与js主线程并行地做一些事情，并在事情做完之后通知主线程。
//代码2
setTimeout(() => {
    console.log("world")
}, 1000);
console.log("hello")
//输出结果：hello world
//如上所述，JS本身是单线程的，无法异步执行
//因此我们可以认为setTimeout这类JS规范之外的由运行环境提供的特殊函数做的事情是创建一个平行线程后立即返回，让JS主流程可以接着执行后续代码，并在收到平行流程的通知后再执行回调函数。
//除了setTimeout,setInterval这些常见的，这类函数还包括NodeJS提供的诸如fs.readFile之类的异步API


//由于JS是单线程运行，所以JS在执行完一段代码之前无法执行包括回调函数在内的别的代码
//也就是说，即使平行线程完成工作了，通知JS主线程执行回调函数了，回调函数也要等到JS主线程空闲时才能开始执行。
//代码3
function heavyCompute1(n){
    var t=new Date();
    setTimeout(() => {
        console.log(new Date()-t)
    }, 500);
    var count=0,i,j;
    for(i=n;i>0;--i){
        for(j=n;j>0;--j){
            count+=1;
        }
    }
}
heavyCompute1(80000)
//输出结果大于500,本该在0.5秒之后调用的回调函数因为JS主线程忙于运行其他代码，所以时间被大幅延迟。

/**
 * 代码设计模式
 * 异步编程有很多特有的代码设计模式，为了实现同样的功能，使用同步方式和异步方式编写的代码会有很大差异。
 */
//函数返回值
//同步
var output=fn1(fn2('input'));
doSomething(output)
// 异步
fn2('input',(output2)=>{
    fn1(output2,(output1)=>{
        doSomething(output1)
    })
})
//异步方法就是一个回调函数套一个回调函数

//遍历数组
//同步
var len=arr.length,i=0;
for(;i<len;i++){
    arr[i]=sync(arr[i])
}
doNextThing();
//异步（串行）
(function next(i,len,callback){
    if(i<len){
        async(arr[i],(value)=>{
            arr[i]=value;
            next(i+1,len,callback)
        })
    }else{
        callback();
    }
}(0,arr.length,()=>{
    doNextThing();
}))
//以上代码在异步函数执行一次并返回执行结果后才传入下一个数组成员并开始下一轮执行，知道所有数组成员处理完毕后，通过回调的方式触发后续代码的执行。
//异步（并行）
(function(i,len,count,callback){
    for(;i<len;i++){
        (function(i){
            async(arr[i],function(value){
                arr[i]=value;
                if(++count===len){
                    callback()
                }
            })
        }(i))
    }
}(0,arr.length,0,()=>{

}))
//与异步串行遍历的版本相比，以上的代码并行处理所有数组成员，并通过计数器变量来判断什么时候所有数组成员都处理完毕了。

//异常处理
//同步
function sync(fn){
    return fn();
}
try {
    sync(null)
} catch (err) {
    console.log('Error:%s',err.message)
}
//异步（原始代码）
function async(fn,callback){
    //Code execution path breaks here
    setTimeout(()=>{
        callback();
    },0)
}
try {
    async(null,(data)=>{
        //do something
    })
} catch (err) {
    console.log('Error:%s',err.message)
}
//由于异步函数会打断代码执行路径，异步函数执行过程中以及执行后产生的异常冒泡到执行路径被打断的位置时，如果一直没有遇到try语句，就作为一个全局异常抛出。
//因为代码执行路径被打断了，我们就需要在异常冒泡到断点之前用try语句把异常捕获住，并通过回调函数传递被捕获的异常
//异步（改进）
function async(fn,callback){
    //Code execution path breaks here
    setTimeout(() => {
       try {
           callback(null,fn())
       } catch (err) {
           callback(err)
       } 
    }, 0);
}
async(null,(err,data)=>{
    if(err){
        console.log('Error:%s',err.message);
    }else{
        //do something
    }
})
//调用多次同步函数和异步函数
//多次同步代码
function main(){
    //Do something 
    syncA();
    //Do something
    syncB();
    //Do something
    syncC();
}
try{
    main();
}catch(err){
    //Deal with exception
}
//多次异步代码
function main(callback){
    //Do something
    asyncA((err,data)=>{
        if(err){
            callback(err);
        }else{
            //Do something
            asyncB((err,data)=>{
                if(err){
                    callback(err)
                }else{
                    //Do something
                    asyncC((err,data)=>{
                        if(err){
                            callback(err)
                        }else{
                            //Do something
                            callback(null)
                        }
                    })
                }
            })
        }
    })
}
main((err)=>{
    if(err){
        //Deal with exception
    }
})
//通过上面两个例子，可以看出回调函数已经让代码变得复杂了，而异步方式下对异常的处理更加加剧了代码的复杂度。

/**
 * 域(Domain)
 * NodeJS提供了domain模块，可以简化异步代码的异常处理。
 * 一个域就是一个JS运行环境，在一个运行环境中，如果一个异常没有被捕获，将作为一个全局异常被抛出。
 */
//NodeJS通过process对象提供了捕获全局异常的方法
var process=require('process')
process.on('uncaughtException',(err)=>{
    console.log('Error:%s',err.message)
})
setTimeout((fn) => {
    fn();
}, 0);
//虽然全局异常有地方捕获了，但是对于大多数异常，我们希望尽早捕获，并根据结果决定代码的执行路径
//例如
var http=require('http')
function async(request,callback){
    //Do something
    asyncA(request,(err,data)=>{
        if(err){
            callback(err)
        }else{
            //Do something
            asyncB(request,(err,data)=>{
                if(err){
                    callback(err)
                }else{
                    //Do something
                    asyncC(request,(err,data)=>{
                        if(err){
                            callback(err)
                        }else{
                            //Do something
                            callback(null,data)
                        }
                    })
                }
            })
        }
    })
}
http.createServer((request,response)=>{
    async(request,(err,data)=>{
        if(err){
            response.writeHead(500);
            response.end();
        }else{
            response.writeHead(200);
            response.end(data);
        }
    })
})
//使用domain模块优化以上代码
var http=require('http');
var domain=require('domain');
function async(request,callback){
    //Do something
    asyncA(request,(data)=>{
        //Do something
        asyncB(request,(data)=>{
            //Do something
            asyncC(request,(data)=>{
                //Do something
                callback(data)
            })
        })
    })
}
http.createServer((request,response)=>{
    var d=domain.create();
    d.on('error',()=>{
        response.writeHead(500);
        response.end();
    });
    d.run(()=>{
        async(request,(data)=>{
            response.writeHead(200);
            response.end(data);
        })
    })
})
//使用.create方法创建了一个子域对象，并通过.run方法进入需要在子域中运行的代码的入口点。
//位于子域中的异步函数回调函数由于不再需要捕获异常，代码一下子瘦身很多

//陷阱
//在NodeJS官方文档里都强烈建议处理完异常后立即重启程序，而不是让程序继续运行
//发生异常后的程序处于一个不确定的运行状态，如果不立即退出的话，程序可能会发生严重的内存泄漏，也可能表现得很奇怪
//JS本身的异常处理机制不会导致内存泄漏，也不会让程序的执行结果出乎意料
//NodeJS中大量的API内部是用C/C++实现的，这个可能导致内存泄漏等问题
