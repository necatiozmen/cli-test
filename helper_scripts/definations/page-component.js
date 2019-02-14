const inquirer = require('inquirer');
const mustache = require("mustache");
const fs = require('fs');
const path = require('path');
const helper = require('./helper');

const showQuestions = () => {
    const questions = [
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter new page name',
            validate(val) {
                
                if(val.length) {                    
                    if(
                        helper.isAlreadyExist(
                            helper.config.pagesDir,
                            val,
                            true
                        )
                    ) {
                        return "Already added use new page name";
                    }
                    return true;
                }
                return "Cannot be empty"
            }
        },
        {
            type: 'confirm',
            name: 'isConnectStore',
            message: 'Do you want to connect store',
            default: false
        },
        {
            type: 'confirm',
            name: 'isHaveStyle',
            message: 'Do you want styles file',
            default: true
        },
    ];

    inquirer.prompt(questions).then(answers => {
        answers.isPage = true;
        helper.createClassComponent(answers);
        if (answers.isHaveStyle) {
            helper.createStyle(answers)
        }
       
    }
    )
}

module.exports = {
    showQuestions
}    