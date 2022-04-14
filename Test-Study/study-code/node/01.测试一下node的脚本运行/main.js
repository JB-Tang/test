const TARGET = process.env.npm_lifecycle_event
console.log('当前运行脚本：',process.env, TARGET)
if(TARGET === 'test'){
    console.log('Running the test task!')
}
if(TARGET === 'pretest'){
    console.log('Running the pretest task!')
}
if(TARGET === 'posttest'){
    console.log('Running the posttest task!')
}