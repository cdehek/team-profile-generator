const inquirer = require("inquirer");
const fs = require('fs');


const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateHTML = require("./lib/generateHTML");

const employees = [];
const engineers = [];
const interns = [];
const managers = [];

const promptUser = () => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Name:",
          name: "name"
        },
        {
          type: "input",
          message: "Email:",
          name: "email"
        },
        {
          type: "list",
          name: "role",
          message: "What's Your Position At The Company?",
          choices: ["Manager", "Engineer", "Intern"]
        }
      ])
      .then(function(data) {
        switch (data.role) {
          case "Manager":
             inquirer
              .prompt([
                {
                  type: "input",
                  message: "Enter employee ID: ",
                  name: "id"
                },
                {
                  type: "input",
                  message: "Enter office number: ",
                  name: "office"
                }
              ])
              .then(function(res) {
                const officeNum = res.office;
                // console.log(officeNum);
                const manager = new Manager(
                  data.name,
                  res.id,
                  data.email,
                  officeNum,
                  "Manager"
                );
                // console.log(manager);
                employees.push(manager);
              }).then(function(){
                addNewEmployee()
                });
            break;
          case "Engineer":
             inquirer
              .prompt([
                {
                  type: "input",
                  message: "Enter employee ID: ",
                  name: "id"
                },
                {
                  type: "input",
                  message: "Enter github username: ",
                  name: "github"
                }
              ])
              .then(function(res) {
                const githubName = res.github;
                const engineer = new Engineer(
                  data.name,
                  res.id,
                  data.email,
                  githubName,
                  "Engineer"
                );
                employees.push(engineer);
              }).then(function(){
                addNewEmployee()
                });
            break;
          case "Intern":
             inquirer
              .prompt([
                {
                  type: "input",
                  message: "Enter employee ID: ",
                  name: "id"
                },
                {
                  type: "input",
                  message: "Enter school: ",
                  name: "school"
                }
              ])
              .then(function(res) {
                const internSchool = res.school;
                const intern = new Intern(
                  data.name,
                  res.id,
                  data.email,
                  internSchool,
                  "Intern"
                );
                employees.push(intern);
              }).then(function(){
                addNewEmployee()
                });
            break;
        }
      })
      .then(function() {
    });
};

const addNewEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
      name: "add",
      message: "Would You Like To Add Another Employee?",
      choices: ["Yes", "No"]
      }
    ])
    .then(function(res) {
      if (res.add === "Yes") {
        promptUser();
      } else {
        console.log("Finished!");
        finishedHTML(employees);
      }
    });
};

function finishedHTML(employees){
  console.log("Finished!");
  console.log(employees);
  
  const pageHTML = generateHTML(employees);
  console.log(pageHTML);

  fs.writeFile('index.html', pageHTML, err => {
    if (err) throw err;

    console.log('HTML complete! Checkout index.html to see the output!')
  });
}


function init(){
    console.log("Please enter employee info")
    promptUser();
};

init();