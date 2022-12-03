// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract SCM {
    uint public productCount = 0;

    struct Product{
        uint id;
        string name;
        string date;
        string weight;
    }

    constructor() { // <——— Has 0 arguments
        // console.log("Hey!");
    }

    // mapping(uint => Product) public products;

    // function createTask(string memory name, string memory date, string memory weight) public {
    //     productCount++;
    //     products[productCount] = Product(productCount, name, date, weight);
    // }

    Product []products;
  
   // Function to add 
   // employee details
   function addProduct(
     string memory name, string memory date, string memory weight
   ) public returns(Product[] memory){
       productCount++;
       Product memory e
         =Product(productCount, name, date, weight);
       products.push(e);
       return products;
   }

    function getTask(uint empid) public view returns(
     string memory name, 
     string memory date, 
     string memory weight){
       uint i;
       for(i=0;i<products.length;i++)
       {
           Product memory e
             =products[i];
           
           // Looks for a matching 
           // employee id
           if(e.id==empid)
           {
                  return(e.name,
                      e.date,
                      e.weight);
           }
       }
    }

    function getAllTasks() view public returns(Product[] memory){
       return products;
    }
}