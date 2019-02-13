const inquirer = require('inquirer');

const showQuestions = () => {
    
    const questions = [
        {
            type: 'list',
            name: 'fileType',
            message: 'What do you want to create ?',
            choices: ["styles", "interfaces", "functional component", "class based component"]
        },
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter name of file to create'
        },
    ];
    

}
