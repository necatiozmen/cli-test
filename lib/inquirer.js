const inquirer = require('inquirer');
const program = require('commander');




module.exports = {

    askPageType: () => {

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


        program
            .command('addFile')
            .alias('a')
            .description('Add a file')
            .action(() => {
                   prompt(questions).then(answers =>
                    console.log("filename to create", answers))
            });
            
            return program.parse(process.argv);

    }
}

