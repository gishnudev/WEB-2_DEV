const lodash = require('lodash')
console.log('hello world')

const newName = 'node.js';

console.log('Hello',`${newName}!`);

if(newName==='node.js'){
    console.log('running on node.js enviornment');

}
for(let i=0;i<5;i++){
    console.log(i+1)
}
let array = [1,2,3,4,5];
console.log(lodash.reverse(array));