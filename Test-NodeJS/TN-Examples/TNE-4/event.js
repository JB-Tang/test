//客户端
var http=require('http');
var req=http.get("http://localhost:8888/?x=fromclient",(res)=>{
    console.log("Got reponse:"+res.statusCode);
    var data="";
    res.on('data',(chunk)=>{
        data+=chunk;
    }).on('end',()=>{
        console.log("Got data:%s",data);
    })
}).on('error',(e)=>{
    console.log("Got error:"+e.message);
})


//服务端
var http=require('http');
var url=require('url');
const { readFile } = require('fs');

function onRequest(request,response){
    console.log("Requst received.");
    var url_parts=url.parse(request.url,true);
    var query=url_parts.query;

    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("hello world"+query.x);
    response.end();
}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");


//Promise
readFile(function(err,data){
    
})

