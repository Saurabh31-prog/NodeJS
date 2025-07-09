const notes = require('./notes.js');
var _ = require('lodash');

var age = notes.age;
console.log(age);

var result = notes.addNumber(2, 5);
console.log(result);

var data = ["person", "pearson", 1,
  'name'
];
var filter = _.uniq(data);
console.log(filter);

console.log(_.isString('hi')); //true

//inter conversion json to an object in node.js

const jsonString = '{"name":"Saurabh","age":24}';
const obj = JSON.parse(jsonString);
console.log(obj);

//inter conversion object to json
const jsonStringified = JSON.stringify(obj);
console.log(jsonStringified); 