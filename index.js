#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const program = require('commander');

const funcComp = require('./helper_scripts/definations/functional-component');
const classComp = require('./helper_scripts/definations/class-component');
const pageComp = require('./helper_scripts/definations/page-component');

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
        choices: ["page", "functional-component", "class-component", "interfaces"]
    },
];


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
                    break;
                case "page":
                    pageComp.showQuestions();
                default:
                    break;
            }
        }
        )
    }
    );
    

program.parse(process.argv);

