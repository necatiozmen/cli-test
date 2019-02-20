#!/usr/bin/env node

import * as chalk from 'chalk';
import * as clear from 'clear';
import * as program from 'commander';
import * as figlet from 'figlet';
import * as inquirer from 'inquirer';

import { classComp } from './helper_scripts/definations/class-component';
import { funcComp } from './helper_scripts/definations/functional-component';
import { pageComp } from './helper_scripts/definations/page-component';

clear();
console.log(
	chalk.yellow(
		figlet.textSync('PANKOD', { horizontalLayout: 'fitted' })
	)
);

const questions = [
	{
		choices: ['page', 'functional-component', 'class-component', 'interfaces'],
		message: 'What do you want to create ?',
		name: 'fileType',
		type: 'list'
	}
];

program
	.command('addFile')
	.alias('a')
	.description('Add a file')
	.action(() => {
		inquirer.prompt(questions).then((answers: { fileType: string }) => {
			switch (answers.fileType) {
				case 'functional-component':
					funcComp.showQuestions();
					break;
				case 'class-component':
					classComp.showQuestions();
					break;
				case 'page':
					pageComp.showQuestions();
				default:
					break;
			}
		}
		)
	}
	);

program.parse(process.argv);
