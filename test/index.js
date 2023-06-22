// const { json } = require("body-parser");

// console.log('hellow1')
// var b = prompt('helow');
// var a = setTimeout(()=>alert('hellow2'),2000)
// // alert('hello3')

// if(b == 'no'){
//     clearTimeout(a);
// }else{
    
// }

// function Student(first, last, age){
//     this.firstName = first;
//     this.lastName = last;
//     this.age = age;
// }

// var students = new Student('imran', 'raza', 25)
// var student2 = new Student('junded', 'khan', 30)
// console.log(students, student2);

// class person{
//     constructor(name, age){
//         this.name = name;
//         this.age = age
//     }
//     static sayhi(){
//         console.log('hellow')
//     }
// }

// class employe extends person{
//     constructor(name, age, work){
//         super(name, age)
//         this.work = work
//     }
  
// }

// let person1 = new employe('imran', 20, 'software develper');
// console.log(person1, person.sayhi());

// var arr = [88, 90, 33, 45, 23,];

// for(var a = arr.length-1; a>=0; a--){
//     console.log(arr[a]);
// }

// for(var a = 0; a<arr.length-1; a++){
//     for(var b =a; b<arr.length; b++){
//         if(arr[a] > arr[b]){
//             var result = arr[a];
//             arr[a] = arr[b]
//             arr[b] = result;
//         }
//     }
// }
// console.log(arr)

// console.log(NaN===NaN);
// console.log(NaN==NaN);

// const b = [1, 2, 3, 4, 5];
// for (var i = 0; i < 5; i++) {
// setTimeout(() => console.log(b[i]), 1000);
// }
// for (let i = 0; i < 5; i++) {
// setTimeout(() => console.log(b[i]), 1);
// };

// function val(a){
//     console.log(a)
// }

// function add(a, callback){
//     console.log(a);
//     callback(a);
// }
// add('Hellow', val);

// var promis = new Promise(function(result, error){
//     alert('hellow 1');
//     result();
//     console.log('hellow 2')
    
// })
// console.log(promis);

// map function use 

// const arr = [1,2,3,205,2,6,4,1,5,8,5,6,3,2,2,5]
const obj = [
    {firsName: "imran", lastName: "raza"},
    { firsName: "sameer", lastName: "khan" },
    { firsName: "irfan", lastName: "saif" },
]

// const result = arr.map(function(x){
//     return x * 10;
// })

// console.log(result);
// const resultName = obj.map(function (x) {
//     return x.firsName + " " + x.lastName;
// })

// console.log(resultName);

// function getData() {


// setTimeout(()=>{
//     obj.forEach((element, index) => {
//         console.log(index +' '+ element.firsName +" "+ element.lastName);
//     });
// }, 2000)

// }



// function newData(newData){
//     return new Promise(function(resolve, reject){
//     setTimeout(()=>{
//         if(true){
//             resolve();
//         }
      
//         obj.push(newData)
//     },3000)
// })
// }



// newData({ firsName: "farhan", lastName: "siddiqui" }).then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })

// let student = {
//     name: 'imran',
//     age:'25',
    
    
// }

// let printeFunc = function (student2) {
//     console.log(this.name)
// }

// printeFunc.call(student);

// let student2 = {
//     name: 'raza',
//     age: '26',


// }

// printeFunc.call(student2);

// print the palindrom number
// var pailndrom = prompt("Enter The value");
// var len = pailndrom.length
// var msg = 'this is pailndrom number'
// for(var a=0; a<len/2; a++){
//     if (pailndrom[a] === pailndrom[len - 1 - a]){
//        console.log( "this is palindrom number", pailndrom) 
//     }else{
//         console.log("this is not palindrom number", pailndrom)
//     }
    
// }

var arr = [21,56,42,1,36,2,3,14,23]

// reverse array
// for (var a=arr.length; a>=0; a--){
//     console.log(arr[a]);
// }

// reverse string 
var str = "hello";
var rever = "";
for(var a =str.length-1; a>=0; a--){
    rever += str[a];
}
console.log(rever, str);

// short array
// for (var b = 0; b<arr.length; b++){
// for (var c=b; c<arr.length; c++){
//     if(arr[b]>arr[c]){
//         var result = arr[b]
//         arr[b] = arr[c]
//         arr[c] = result;
//     }
// }
// }
console.log(arr)

function rest(...other){

    // var result = num+num1+num3+num4+num5+num6+num7
    console.log(other[7])
}
rest(...arr)


