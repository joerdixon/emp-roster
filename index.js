// Required Classes
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")
const Manager = require("./lib/Manager")
// Required Packages
const genHTML = require('./util/generateHtml')
const inquirer = require("inquirer")
const fs = require('fs')
// Initialize empty team.
const team = [];
let stillAdding = true;


async function addEngineer() {
    const newEng = await inquirer.prompt([
        {
            message: "What is the engineers name? ",
            name: "engName",
            type: "input"
        },
        {
            message: "What is the engineers employee ID? ",
            name: "engID",
            type: "input"
        },
        {
            message: "What is the engineers email? ",
            name: "engEmail",
            type: "input"
        },
        {
            message: "What is the engineers GitHub username? ",
            name: "engGH",
            type: "input"
        }
    ])
        team.push(new Engineer(newEng.engName, newEng.engID, newEng.engEmail, newEng.engGH))
    }


async function addIntern() {
  const newInt = await inquirer.prompt([
        {
            message: "What is the intern's name? ",
            name: "intName",
            type: "input"
        },
        {
            message: "What is the intern's employee ID? ",
            name: "intID",
            type: "input"
        },
        {
            message: "What is the intern's email? ",
            name: "intEmail",
            type: "input"
        },
        {
            message: "What is the intern's school? ",
            name: "intSchool",
            type: "input"
        }
    ])
        team.push(new Intern(newInt.intName, newInt.intID, newInt.intEmail, newInt.intSchool))
    }

async function newManager() {
    const newMan = await inquirer.prompt([
        {
            message: "Who is the manager for this project? ",
            type: "input",
            name: "managerName"
        },
        {
            message: "What is their employee ID? ",
            type: "input",
            name: "empID"
        },
        {
            message: "What is their email? ",
            type: "input",
            name: "empEmail"
        },
        {
            message: "What office are they in? ",
            type: "input",
            name: "office"
        }
    ])
        team.push(new Manager(newMan.managerName, newMan.empID, newMan.empEmail, newMan.office));
    }


async function newEmployee() {
    const newEmp = await inquirer.prompt([
        {
            message: "Would you like to add another employee? ",
            type: "list",
            choices: ["Engineer", "Intern", "No more employees"],
            name: "nextEmp"
        }
    ])
        switch (newEmp.nextEmp) {
            case "Engineer":
                await addEngineer();
                break;
            case "Intern":
                await addIntern();
                break;
            case "No more employees":
                stillAdding = false;
                break;
        }
    }


async function init() {
    await newManager();
    while (stillAdding) {
        await newEmployee()
    }
    await fs.writeFile("myTeam.html", genHTML(team), (err) => console.log(err))
}

init();