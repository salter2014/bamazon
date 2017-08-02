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
    promptManager()
});

function promptManager() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which task do you choose?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "managerOptions"
        }
    ]).then(function (answers) {
        taskManager(answers.managerOptions);
    });
};

function taskManager(managerChoice) {
    switch (managerChoice) {
        case "View Products for Sale":
            viewProducts();
            break;
        case "View Low Inventory":
            viewLowInventory();
            break;
        case "Add to Inventory":
            promptIncManager();
            break;
        case "Add New Product":
            promptAddProduct();
            break;
        default:
            console.log("Unexpected Input Error");
    }
};

function repromptManager() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Are there other transactions you would like to run?",
            name: "confirm",
            default: true
        },
    ]).then(function (answers) {
        if (answers.confirm) {
            promptManager();
        } else {
            console.log("Thank you. Have a nice day.");
            process.exit();
        }
    });
};

function viewProducts() {
    var query = connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " | Name: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Quantity; " + res[i].stock_quantity + "\n");
        }
        console.log("-----------------------------------\n");
        repromptManager()
    });
};

function viewLowInventory() {
    var query = connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (res.length === 0) {
            console.log("No products have a quantity fewer than 5.")
        } else {
            for (var i = 0; i < res.length; i++) {
                console.log("Item ID: " + res[i].item_id + " | Name: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Quantity; " + res[i].stock_quantity + "\n");
            }
        };
        console.log("-----------------------------------\n");
        repromptManager()
    });
};

function promptIncManager() {
    inquirer.prompt([
        {
            name: "item_id",
            message: "What is the ID of the product you want to increase?"
        }, {
            name: "stock_quantity",
            message: "By how many units would you like to increase the quantity?"
        }
    ]).then(function (answers) {
        increaseProduct(answers.item_id, answers.stock_quantity);
    });
};

function increaseStock(item_id, stock_quantity) {
     var query = connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id=?", [stock_quantity, item_id], function(err, res) {
        repromptManager();
     });
}

function increaseProduct(item_id, stock_quantity) {
  var query = connection.query("SELECT product_name, stock_quantity, price FROM products WHERE item_id=?", [item_id], function(err, res) {
    if (res.length === 0) {
        console.log("No product with supplied ID exists in the inventory.");
        repromptManager();
    } else {
        console.log(res[0].product_name + " has increased to " + (res[0].stock_quantity + parseInt(stock_quantity)));
        console.log("\n-----------------------------------\n");
        increaseStock(item_id, stock_quantity);
    }
  });
};

function addProduct(product_name, department_name, price, stock_quantity) {
    var query = connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [product_name, department_name, price, stock_quantity], function(err, res) {
        console.log(product_name + " has been added.");
        console.log("\n-----------------------------------\n");
        repromptManager();
    });
};

function promptAddProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            message: "What is the name of the product you want to add?"
        },{
            name: "department_name",
            message: "What is the department of the product you want to add?"
        },{
            name: "price",
            message: "What is the price of the product you want to add?"
        }, {
            name: "stock_quantity",
            message: "How many units of the new product?"
        }
    ]).then(function (answers) {
        addProduct(answers.product_name, answers.department_name, answers.price, answers.stock_quantity);
    });
};