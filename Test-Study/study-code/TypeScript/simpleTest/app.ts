interface Person { 
    age:number 
 } 
  
 interface Musician extends Person { 
    instrument:string ,
    play:()=>{}
 } 
  
 var drummer:Musician; 
 drummer.age = 27 
 drummer.instrument = "Drums" 
 console.log("年龄:  "+drummer.age)
 console.log("喜欢的乐器:  "+drummer.instrument)

 function test<Type>(uname:Type):Type {
    return uname;
 }
 let result=test<string>('111')