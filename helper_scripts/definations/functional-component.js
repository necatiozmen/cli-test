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
            message: 'Enter functional component name',
            validate(val) {
                
                if(val.length) {                    
                    if(
                        helper.isAlreadyExist(
                            helper.config.componentsDir,
                       /*      val.indexOf('.js') || val.indexOf('.jsx') ) > 0 ? val.replace(/.js|jsx/gi, '') : val, */
                            val.indexOf('.js')  > 0 ? val.replace('.js', '') : val,
                            true
                        )
                    ) {
                        return "Already added use new compoment name";
                    }
                    return true;
                }
                return "Cannot be empty"
            }
        },
        {
            type: 'confirm',
            name: 'isHaveStyle',
            message: 'Do you want styles file',
            default: true
        },
    ];

    inquirer.prompt(questions).then(answers => {
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
  
        fs.writeFile(path.resolve(__dirname, `../../${answers.fileName}.tsx`),
            mustache.render(fs.readFileSync(path.resolve(__dirname, '../templates/components/functional.mustache'), 'utf8'),
                { fileName: answers.fileName, interfaceName: `I${answers.fileName}`, isHaveStyle: answers.isHaveStyle })
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