// use the builtin 'require' function to include the Node.js File System module (to modify local files)
const fs = require("fs");

// include the Inquirer.js command line user interface module for Node.js
const inquirer = require("inquirer");

// QUESTION: why do I need this module ...
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// initial test code to check functionality
// inquirer.prompt([
//     {
//         type: "input",
//         message: "Please enter the title for your project (i.e. README Generator):",
//         name: "title"
//     }
// ]).then(function(response) {
//     fs.writeFile("README.md", response.title, function(err) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log("Success!");
// 
        // provide command line feedback to check if writeFile function is working
        // fs.readFile("README.md", "utf8", function(error, data) {
        //     console.log("READING README.MD ...");
        //     if (error) {
        //         return console.log(error);
        //     }
        //     console.log(data);
        // })
//     })
// })

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter the title for your project (i.e. README Generator):",
            name: "title"
        }
    ]);
}


function generateMD(answers) {
    return `
    # ${answers.title}

    ## Description

    ## Table of Contents

    ## Installation

    ## Usage

    ## License

    ## Contributing

    ## Tests

    ## Questions
    `;
}

promptUser()
    .then(function(answers) {
        const md = generateMD(answers);

        return writeFileAsync("README.md", md);
    })
    .then(function() {
        console.log("Successfully wrote to README.md");
    })
    .catch(function(err) {
        console.log(err);
    });