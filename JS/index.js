let testData = [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false];
let testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];
let testData3 = [
  {"name":"Vasya","email":"vasya@example.com","age":20,"skills":{"php":0,"js":-1,"madness":10,"rage":10}},
  {"name":"Dima","email":"dima@example.com","age":34,"skills":{"php":5,"js":7,"madness":3,"rage":2}},
  {"name":"Colya","email":"colya@example.com","age":46,"skills":{"php":8,"js":-2,"madness":1,"rage":4}},
  {"name":"Misha","email":"misha@example.com","age":16,"skills":{"php":6,"js":6,"madness":5,"rage":2}},
  {"name":"Ashan","email":"ashan@example.com","age":99,"skills":{"php":0,"js":10,"madness":10,"rage":1}},
  {"name":"Rafshan","email":"rafshan@example.com","age":11,"skills":{"php":0,"js":0,"madness":0,"rage":10}}
];
let testData4 = [
  {"name":"Vasya","email":"vasya@example.com","age":20},
  {"name":"Dima","email":"dima@example.com","age":34},
  {"name":"Colya","email":"colya@example.com","age":46},
  {"name":"Misha","email":"misha@example.com","age":16},
  {"name":"Ashan","email":"ashan@example.com","age":99},
  {"name":"Rafshan","email":"rafshan@example.com","age":11},
  1,2,1990,85,24,"Vasya","colya@example.com","Rafshan","ashan@example.com",true,false,
  [[[[1,2,1990,85,24,"Vasya","colya@example.com","Rafshan","ashan@example.com",true,false,
  [{"name":"Rafshan","email":"rafshan@example.com","age":11}]]]]]
]

// 1 -> cloneDeep
function cloneDeep(obj) {
  if ( !obj || typeof obj != 'object') {
    return obj;
  }

  let copy = obj instanceof Array ? [] : {};

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      copy[prop] = cloneDeep(obj[prop]);
    }
  } 

  return copy;
}


// 2 -> concat Arrays
var arrays = [[1, 2, 3], [4, 5], [6]];

const concatArray = (arr) => {
  return arr.reduce((prevArr, curArr) => prevArr.concat(curArr), []);
};

// console.log(concatArray(arrays));


// 3 -> reliableMultiple
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  let res;

  while(!res) {
    try {
      res = primitiveMultiply(a, b);
    } catch(err) {
      if (!err instanceof MultiplicatorUnitFailure) {
        throw err;
      }
    }
  }

  return res;
}

// console.log(reliableMultiply(8, 8));


// 4 -> extend Array prototype
// var arr = [1, 2, 3];

// Object.getPrototypeOf(arr).append = function(val) {
//   this.splice(0, 0, val);
// }

// arr.append(0)
// //[0, 1, 2, 3]

// console.log(arr);


// 5 -> recuseLog

// var arr = ['Solnce', 'vishlo', 'iz', 'za', 'tuchi']; 

function recuseLog(arr, idx = 0) {
  if (idx == arr.length) {
    return;
  }  else {
    alert(arr[idx]);
    return recuseLog(arr, idx + 1); 
  }
} 

// recuseLog(arr);


// 6 -> paralell callback

// const paralell = (arr, callback) => {
//   callback(
//     arr.map(([func, params]) => func.apply(this, params))
//   );
// };

// var a = function(one, two) {
//   return one + two;
// };

// var b = function() {
//   return false;
// };

// paralell([[a, [1, 2]], [b]], function(results) {
//     console.log(results); // [3, false]
// });


// 7 -> array find by str and regexp

// const array_find = (arr, search) => {
//   if (/\/(.*)\/(.*)/.test(search)) {
//     search = /\/(.*)\/(.*)/.exec(search);
//     search = new RegExp(search[1], search[2]);
//   }
//   return arr.filter(element => element.toString().match(search));
// }

// let result = array_find(testData, '/^raf.*/i') // ["Rafshan"]
// let result2 = array_find(testData, "Rafshan") // ["Rafshan"]

// console.log(result, result2);


// 8 -> array skip

// const array_skip_until = (arr, value) => {
//   const idx = arr.indexOf(value);
//   return idx !== -1 ? arr.slice(idx) : [];
// }

// let result = array_skip_until(testData, 2) // [2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]
// let result2 = array_skip_until(testData, "Rafshan") // ["Rafshan", "ashan@example.com", true, false]
// let result3 = array_skip_until(testData, "asd") // []

// console.log(result, result2, result3);


// 9 -> array normalize Не доделано

// const array_normalize = (arr, shema, transform = false) => {
//   switch(shema) {
//     case 'number':
//       return transform ? arr.map(el => Number(el)).filter(el => !isNaN(el)) : arr.filter(el => +el === el);
//     case 'int': 
//       return transform ? arr.map(el => Number(Math.trunc(el)))
//       .filter(el => !isNaN(el)) : arr.filter(el => parseInt(el) === el);
//     case 'float':
//       return arr.filter(el => +el === el && parseInt(el) !== el);
//     case 'string':
//       return arr.filter(el => typeof el === 'string');
//     case 'bool': case 'boolean':
//       return arr.filter(el => !!el === el);
//     case 'array':
//       return arr.filter(el => el instanceof Array);
//     case 'function':
//       return arr.filter(el => el instanceof Function);
//     case 'object':
//       return arr.filter(el => el instanceof Object && !(el instanceof Array) && !(el instanceof Function));
//     default:
//       return 'The type hasn`t added yet';
//   }
// }

// let result = array_normalize(testData4, 'string') // ['Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
// let result2 = array_normalize(testData4, 'string', true) // ['1', '2', '1990', '85', '24', 'Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
// let result3 = array_normalize(testData4, {age: 'float'}) // []
// let result4 = array_normalize(testData4, {age: 'float'}, true) // [{age: 20}, {age: 34}, {age: 46}, {age: 16}, {age: 99}, {age: 11}]

// console.log(result, result2, result3, result4);

// 10 -> array unique

// const array_unique = (arr) => {
//   return [...new Set(arr)];
// };

// let result = array_unique(testData.concat(testData2)) // [1, 2, 1990, 85, 24, 5, 7, 8.1, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]
// console.log(result);


// 11 -> array pluck

// const array_pluck = (arr, path) => {
//   const subPaths = path.split('.');

//   return arr.map(obj => {
//     let cur = obj;

//     for (let i = 0; i < subPaths.length; i++) {
//       if (typeof cur[subPaths[i]] !== 'object') {
//         return cur[subPaths[i]];
//       } 
//       cur = cur[subPaths[i]];
//     }
//   })
// };

// let result = array_pluck(testData3, 'name') // ["Vasya", "Dima", "Colya", "Misha", "Ashan", "Rafshan"]
// let result2 = array_pluck(testData3, 'skills.php') // [0, 5, 8, 6, 0, 0]

// console.log(result, result2);


// 12 -> array combine (два варианта)

// const array_combine = (key, value) => {
//   // let res = {};
//   // key.map((el, id) => {
//   //   res[el] = value[id];
//   // })
//   // return res;

//   // return key.reduce((prev, cur, id) => {
//   //   prev[cur] = value[id];
//   //   return prev;
//   // }, {});
// }

// let result = array_combine(testData, testData2) // {1: 1, 2: 2, 1990: 1990, 85: 85, 24: 24, "Vasya": 5, "colya@example.com": 7, "Rafshan": 8.1, "ashan@example.com": undefined}

// console.log(result);
