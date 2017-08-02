# Bamazon CLI App

This app was created as part of a Homework assignment for a Full stack development course. This repository contains two CLI apps which allow users to manipulate a database of hypothetical products to simulate an online store buying experience. Required Node Modules: mySQL, Inquirer

## bamazonCustomer.js
This app utilizes the Inquirer Node module to allow a user to purchase products in a simulated online store. A user will be prompted to select an item ID and quantity. If the item is available at the desired quantity a user will be afforded the opportunity to purchase the items and the database will be updated, otherwise out of stock warnings will be displayed. The prompts will be repeated until the user declines to continue. See screen shot for more details:
![Bamazon Manager Example](/screens/bamazonCustomerExample.png)

## bamazonManager.js
This app utilizes the Inquirer Node module to allow a user to view and update products in a simulated online store. A user will be prompted with a list of tasks to perform. The database will be updated depending on the tasks preformed. 
Prompts:

View Products for Sale: Displays the products for sale,
View Low Inventory: Displays all products with less than 5 items available
Add Inventory: Updates the inventory of a selected product 
Add New Product: adds a new product to the database

The prompts will be repeated until the user declines to continue. See screen shot for more details:
![Bamazon Manager Example](/screens/bamazonManagerExample.png)