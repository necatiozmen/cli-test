const inquirer = require('inquirer');
const helper = require('./helper');

const showQuestions = () => {
    const questions = [
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter class based component name',
            validate(val) {
                if (val.length) {
                    if (
                        helper.isAlreadyExist(
                            helper.config.componentsDir,
                            val,
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