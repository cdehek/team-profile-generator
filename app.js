const inquirer = require("inquirer");


const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");


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
                console.log(officeNum);
                const manager = new Manager(
                  data.name,
                  res.id,
                  data.email,
                  officeNum,
                  "Manager"
                );
                console.log(manager);
                employees.push(manager);
              }).then(function(){
                addNext()
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
                addNext()
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

function init(){
    console.log("Please enter employee info")
    promptUser();
};

init();