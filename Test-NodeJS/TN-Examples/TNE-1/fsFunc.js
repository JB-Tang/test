var fs=require('fs')

function copySmall(src,dst){
    fs.writeFileSync(dst,fs.readFileSync(src));
}



function main(argv){
    
}