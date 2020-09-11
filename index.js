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
        },
        {
            type: "input",
            message: "Please provide a brief project description:",
            name: "description"
        },
        {
            type: "input",
            message: "Please include project installation instructions:",
            name: "installation"
        },
        {
            type: "input",
            message: "Please provide project usage information:",
            name: "usage"
        },
        {
            type: "input",
            message: "Please include project contribution guidelines:",
            name: "contributing"
        },
        {
            type: "input",
            message: "Please include project test instructions:",
            name: "tests"
        },
        {
            type: "input",
            message: "Please enter your GitHub username:",
            name: "github"
        },
        {
            type: "input",
            message: "Please enter your email address:",
            name: "email"
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