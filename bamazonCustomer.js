var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysqlPass",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    promptBuyers()
});

function promptBuyers() {
    inquirer.prompt([
        {
            name: "item_id",
            message: "What is the ID of the product you want to buy?"
        }, {
            name: "stock_quantity",
            message: "How many units would you like to buy?"
        }
    ]).then(function (answers) {
        pullProduct(answers.item_id, answers.stock_quantity);
    });
};

function repromptBuyers() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to order a different number of units or a different product?",
            name: "confirm",
            default: true
        },
    ]).then(function (answers) {
        if (answers.confirm) {
            promptBuyers();
        } else {
            console.log("Thank you. Have a nice day.");
            process.exit();
        }
    });
};

function pullProduct(item_id, stock_quantity) {
    var query = connection.query("SELECT product_name, stock_quantity, price FROM products WHERE item_id=?", [item_id], function (err, res) {
        if (res.length === 0) {
            console.log("No product with supplied ID exists in the inventory.");
            repromptBuyers();
        } else if (res[0].stock_quantity < stock_quantity) {
            console.log("There is only " + res[0].stock_quantity + " orders of " + res[0].product_name + " in stock.");
            repromptBuyers();
        } else {
            console.log("You have purchased " + stock_quantity + " orders of " + res[0].product_name + " costing $" + (stock_quantity * res[0].price).toFixed(2));
            reduceStock(item_id, stock_quantity);
        }
    });
};

function reduceStock(item_id, stock_quantity) {
    var query = connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id=?", [stock_quantity, item_id], function (err, res) {
        repromptBuyers();
    });
}