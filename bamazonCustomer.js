var mysql = require("mysql");
const cTable = require('console.table');
var inquirer = require("inquirer");

var productIds = [];
var productQuant = [];
var productPrice = [];

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "P@ssword1000",
    database: "bamazondb"
});

function connectToDataBase() {
    connection.connect(function (err) {
        if (err) throw err;
        //  console.log("connected as id " + connection.threadId + "\n");
    });
}

function showIntialProducts(callback) {
    console.log("showing all products...\n");
    connection.query("select * from products",
        function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            const table = cTable.getTable(res);
            console.log(table);
            getProductIds(res);
            callback();
            // connection.end();
        });
}

function getProductIds(res) {
    productIds=[];
    productQuant=[];
    productPrice=[];
    for (var i = 0; i < res.length; i++) {
        productIds.push('"' + res[i].item_id + '"');
        // console.log("is " +productIds)
        productQuant.push('"' + res[i].item_id + '"' + "|" + res[i].stock_quantity);
        productPrice.push('"' + res[i].item_id + '"' + "|" + res[i].price);
    }
    productIds.unshift("exit from bamazon")
}

function placeCustomerOrder(itemid, units, newQuantity) {
    var b = JSON.parse(itemid);
    console.log("completing order...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newQuantity
            },
            {
                item_id: Number(b)
            }
        ],
        function (err, res) {
            connection.end();
        }
    );
    var unitPrice;
    productPrice.find(function (element) {
        if (element.split('|')[0] == itemid) {
            unitPrice = (element.split('|')[1]).trim()
        }
    });
    console.log("*******purchase complete*************");
    console.log("*************************************");
    console.log("Price: " + unitPrice );
    console.log("Quantity: " + (parseFloat(unitPrice)/parseFloat(units)));
    console.log("Total Price: " + parseFloat(units) * parseFloat(unitPrice));
    console.log("*************************************");
    console.log("*******purchase complete*************");
    //  console.log(query.sql);
    showIntialProducts(promptUserForProduct);
}

function exitApp(){
    connection.end();  //close connection
    process.exit(0);
}

function promptUserForProduct() {
    var product;
    var node;
    inquirer.prompt([
        {
            "type": "list",
            "message": "Select the ID of the product you would like to buy",
            "choices": productIds,
            "name": "itemId"
        }
    ]).then(function (answer) {
        if (answer.itemId == "exit from bamazon") {
            exitApp();
        }
        // number of items based on item id... 
        var availQuantity;
        productQuant.find(function (element) {
            if (element.split('|')[0] == answer.itemId) {
                availQuantity = (element.split('|')[1]).trim()
            }
        });
        inquirer.prompt([
            {
                "type": "input",
                "message": "How many units would u like to buy",
                "name": "numberofUnits"
            }
        ]).then(function (answers2) {
            //  console.log(parseInt(answers2.numberofUnits));
            if (answers2.numberofUnits == 0) 
            {
                exitApp();
            }
            if (parseInt(answers2.numberofUnits) > parseInt(availQuantity)) {
                //  console.log(answers2.numberofUnits + " > " + availQuantity)
                console.log("Insufficient quantity of the product, number availble:" + availQuantity);
                promptUserForProduct();
            }
            else {
                var units = answers2.numberofUnits;
                var num = availQuantity - units;
                placeCustomerOrder(answer.itemId, units, num);
            }
        })
    }); //end of first prompt
}

// show init product
connectToDataBase();
showIntialProducts(promptUserForProduct); //promptUserForProduct called after showAllProducts() as callback;

