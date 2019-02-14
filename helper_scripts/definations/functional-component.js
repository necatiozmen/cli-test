const inquirer = require('inquirer');
const helper = require('./helper');

const showQuestions = () => {
    const questions = [
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter functional component name',
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
            name: 'isHaveStyle',
            message: 'Do you want style ?',
            default: true
        },
    ];

    inquirer.prompt(questions).then(answers => {
        helper.createFuncComponent(answers);
        if (answers.isHaveStyle) {
            helper.createStyle(answers)
        }
    }
    )
}

module.exports = {
    showQuestions
}    