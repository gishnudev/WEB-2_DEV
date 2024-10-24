const {log} = require('console');
const { map } = require('lodash');
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const inventory = new map();

function askCommand(){
    console.log('welcome to inventory system')
    console.log('available commands : add, remove, search, update, summury, exit')
    rl.question
}