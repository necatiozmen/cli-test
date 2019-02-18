const inquirer = require('inquirer');
const helper = require('./helper');

const showQuestions = () => {
    const questions = [
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter new page name',
            validate(val) {

                if (val.length) {
                    if (
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
            type: 'list',
            name: 'isHaveReducer',
            message: 'Do you want to create a new reducer or use your own ?',
            when: ({ isConnectStore }) => isConnectStore,
            choices: [
                new inquirer.Separator(),
                {
                    name: 'Yes, I want to have new reducer.',
                    value: true
                },
                {
                    name: 'No, do not create a new reducer.',
                    value: false
                }
            ]
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
        answers.isPage = true;
        helper.createClassComponent(answers);
        if (answers.isHaveStyle) {
            helper.createStyle(answers)
        }
        if (answers.isHaveReducer) {
            helper.addReducer(answers);
        }
    }
    )
}

module.exports = {
    showQuestions
}    