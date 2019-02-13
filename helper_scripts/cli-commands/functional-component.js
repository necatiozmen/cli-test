const inquirer = require('inquirer');
const mustache = require("mustache");
const fs = require('fs');

const showQuestions = () => {
    const questions = [
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter functional component name'
        },
        {
            type: 'confirm',
            name: 'isHaveStyle',
            message: 'Do you want styles file',
            default: true
        },
    ];

    inquirer.prompt(questions).then(answers => {
        fs.writeFile(`../../${answers.fileName}.tsx`,
         mustache.render(fs.readFileSync('../templates/components/functional.mustache',  'utf8'),
          { fileName: answers.fileName, interfaceName: `I${answers.fileName}`, isHaveStyle: answers.isHaveStyle})
        
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