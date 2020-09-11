const fs = require("fs");
const inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "input",
        message: "Please enter the title for your project:",
        name: "title"
    }
]).then(function(response) {
    fs.writeFile("README.md", response.title, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");

        fs.readFile("README.md", "utf8", function(error, data) {
            console.log("READING README.MD ...");
            if (error) {
                return console.log(error);
            }
            console.log(data);
        })
    })
})
