const inquirer = require('inquirer');
const mustache = require("mustache");
const fs = require('fs');
const path = require('path');

const showQuestions = () => {
    const questions = [
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter class based component name'
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
        fs.writeFile(path.resolve(__dirname, `../../${answers.fileName}.tsx`),
            mustache.render(fs.readFileSync(path.resolve(__dirname, '../templates/components/class.mustache'), 'utf8'),
                { fileName: answers.fileName, interfaceName: `I${answers.fileName}`, 
                isConnectStore:answers.isConnectStore, isHaveStyle: answers.isHaveStyle })
            , err => {
                if (err) throw err;
                console.log("created new functional component");
            })
    }
    )
}

module.exports = {
    showQuestions
}    