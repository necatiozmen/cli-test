#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const program = require('commander');

const fs = require('fs');

const mustache = require("mustache");
const funcComp = require('./helper_scripts/cli-commands/functional-component');
const classComp = require('./helper_scripts/cli-commands/class-component');

clear();

console.log(
    chalk.yellow(
        figlet.textSync('PANKOD', { horizontalLayout: 'full' })
    )
);

const questions = [
    {
        type: 'list',
        name: 'fileType',
        message: 'What do you want to create ?',
        choices: ["styles", "interfaces", "functional-component", "class-component"]
    },
];

/* program
    .command('addFile')
    .alias('a')
    .description('Add a file')
    .action(() => {
        inquirer.prompt(questions).then(answers => {
            fs.writeFile(`./${answers.fileName}.tsx`,
             mustache.render(fs.readFileSync('./templates/components/class.mustache',  'utf8'),
              { fileName: answers.fileName, interfaceName: `I${answers.fileName}`, isConnectStore: false, isHaveStyle:true})
            
            , err => {
                if (err) throw err;
                console.log("created new component");
            })
        }
        )
    }
    ); */

program
    .command('addFile')
    .alias('a')
    .description('Add a file')
    .action(() => {
        inquirer.prompt(questions).then(answers => {
            switch (answers.fileType) {
                case "functional-component":
                    funcComp.showQuestions();
                    break;
                case "class-component":
                    classComp.showQuestions();
                default:
                    break;
            }
       /*      fs.writeFile(`./${answers.fileName}.tsx`,
             mustache.render(fs.readFileSync('./templates/components/class.mustache',  'utf8'),
              { fileName: answers.fileName, interfaceName: `I${answers.fileName}`, isConnectStore: false, isHaveStyle:true})
            
            , err => {
                if (err) throw err;
                console.log("created new component");
            }) */
        }
        )
    }
    );
    
program
    .command('addPage')
    .alias('ap')
    .description('Add a file')
    .action(() => {
        funcComp.showQuestions();
    }
    );

program.parse(process.argv);

