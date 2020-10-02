const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

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
            type: "list",
            message: "Please select a license from the following list:",
            name: "license",
            choices: [
                "Apache 2.0",
                "GPL v3.0",
                "MIT",
            ]
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

    // declare and initialize the 'licenseType' variable used globally/ below (in "License section")
    let licenseType = "";
    
    function generateLicense(license) {
        // create each individual license summary, inside this license generating function (i.e. the only place these variables are used)
        const licenseMIT = "A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.";
        const licenseGPL = "Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.";
        const licenseApache = "A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.";
        
        const licenseTest = "This application is covered under the ";

        // return the user selected license and respective summary
        if (license == "Apache 2.0") {
            return licenseTest + "**Apache 2.0** license. " + licenseApache;
        };
        if (license == "GPL v3.0") {
            return licenseTest + "**GPL v3.0** license. " + licenseGPL;
        };
        if (license == "MIT") {
            return licenseTest + "**MIT** license. " + licenseMIT;
        };
    };
    
    // generate/ update the license type variable with the correct details based on the user's 'answer.license'/selection parameter
    licenseType = generateLicense(answers.license);

    licenseLabel = (answers.license).split(" ").join("%20");

    return `
# ${answers.title}
![License Badge](https://img.shields.io/badge/lisence-${licenseLabel}-green)

## Description
${answers.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${licenseType}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
Please direct any questions regarding this application to the developer @[${answers.github}](https://github.com/${answers.github}) (GitHub), or via email at ${answers.email}.
`;
}

promptUser()
    .then(function(answers) {
        const md = generateMD(answers);

        return writeFileAsync("README_sample.md", md);
    })
    .then(function() {
        console.log("Successfully wrote to README_sample.md");
    })
    .catch(function(err) {
        console.log(err);
    });
