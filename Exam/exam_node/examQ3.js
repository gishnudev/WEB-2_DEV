// Question 3: Node.js Application to Manage Product Orders (30 Marks)
// Create a Node.js application to manage product orders using a Map to store order details. Implement the following functionalities using the readline module for input:

// a. Add an order with a unique order ID, product name, quantity, and customer name. If the order ID already exists, print an error message. (5 marks)

// b. Remove an order using its ID. If the order is not found, print an error message. (5 marks)

// c. Search for orders by product name, customer name, or order ID and print the matching results. (5 marks)

// d. Update the product name, quantity, and/or customer name for an order using its ID. If the order is not found, print an error message. (5 marks)

// e. Print a summary report of all orders in the system, displaying their order ID, product name, quantity, and customer name. (5 marks)

// f. Implement an option to exit the system cleanly after completing the required operations. (5 marks)

const {log} = require('console');
const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output: process.stdout
});

function askCommand(){
    console.log("welcome to inventory")
    console.log("Input commanda are add, remove, search, update, summery :")
    rl.question('enter the command you want to impliment :',function(commands){
        switch(commands.trim().toLocaleLowerCase()){
            case 'add':addItemPrompt();break;
            case 'remove':removeItemPrompt();break;
            case 'search' : searchItemPrompt();break;
            case 'summery' : summeryItemPrompt(); askCommand();break;
            case 'update' : updateItemPrompt();break;
            case 'exit': rl.close(); break;
            default: console.log('invalid input'); askCommand(); break;
        }
    })
}

 function addItemPrompt(){
    rl.question('Enter the id of item:', function(id){
        rl.question('Enter the name of item:',function(name){
            rl.question('Enter the quandity of item:',function(quandity){
                rl.question('Enter customer name :',function(customerName){
                    addItemPrompt(id,name,quandity,customerName)
                    askCommand();
                })
            })
        })
    })
 }

 function addItem(id, name, catagory, quantity) {
    if (inventory.has(id)) {
        console.log(`Error items with id ${id} is already exists.`)
    } else {
        inventory.set(id, { name, catagory, quantity });
        console.log(`Items with ID ${id} added to inventory ! `);

    }
}


 function updateItem(id,itemName,quandity,customerName){
    if (inventory.has (id)){
        console.log(`${id}item already exists`)
    }
    else{
        inventory.set(id,{itemName,quandity,customerName})
        console.log(`${id} item added to the inventary`)
    }
 }

 function removeItemPrompt(){
    console.log('Enter the id of item you want to remove',function(id){
        removeItem(id)
        askCommand()
    })
 }

 function removeItem(id){
    if (inventory.has(id)){
        inventory.delete(id)
        console.log(`${id}item is removed`)
    }else{
        console.log(`${id} item is not found`)
    }
 }

 function searchItemPrompt(){
    console.log('enter item you want to search',function(search){
        searchItem(search)
        askCommand()
    })

 }

 function searchItem(search) {
    const result = [];
    for (const [id, item] of inventory) {
        if (
            id.includes(search) ||
            item.name.includes(search) ||
            item.category.includes(search) ||
            String(item.quantity).includes(search)
        ) {
            result.push({ id, ...item });
        }
    }

    if (result.length > 0) {
        console.log('Search Results:', result);
    } else {
        console.log('No item found');
    }
}

function updateItemPrompt() {
    rl.question('Enter the item ID: ', function (id) {
        rl.question('Enter the item name: ', function (newName) {
            rl.question('Enter item category: ', function (newCategory) {
                rl.question('Enter item quantity: ', function (newQuantity) {
                    updateItem(id, newName, newCategory, newQuantity ? parseInt(newQuantity) : undefined);
                    askCommand();
                });
            });
        });
    });
}

function updateItem(id, newName, newCategory, newQuantity) {
    if (inventory.has(id)) {
        const item = inventory.get(id);
        item.name = newName || item.name;
        item.category = newCategory || item.category;
        item.quantity = newQuantity !== undefined ? newQuantity : item.quantity;

        inventory.set(id, item);
        console.log(`Item with ID ${id} updated`);
    } else {
        console.log('No item found');
    }
}

function summeryItemPrompt() {
    if (inventory.size > 0) {
        for (const [id, item] of inventory) {
            console.log(`ID: ${id}`);
            console.log(`Name: ${item.name}`);
            console.log(`Category: ${item.category}`);
            console.log(`Quantity: ${item.quantity}`);
        }
    } else {
        console.log('No items found!');
    }
}

askCommand();
