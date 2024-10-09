const readline = require('readline')

const rl = readline.createInterface({
    input:process.stdin,
    output: process.stdout
});

function askName(){
    rl.question("What is your Name?",function(name){
        console.log('Hello',`${name}!`);
        askFaviouriteLanguage();

    });
}
function askFaviouriteLanguage(){
    rl.question("What is Your Faviourate language?",function(language){
        console.log(`${language} is great choice!`)
        rl.close();
    });
}
console.log("Welcome to simple interface using readline!")
askName();