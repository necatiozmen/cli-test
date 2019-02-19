import * as inquirer from 'inquirer';
import * as helper from './helper';

export const classComp = {
	showQuestions: async (): Promise<void> => {
		const questions = [
			{
				message: 'Enter class based component name',
				name: 'fileName',
				type: 'input',
				validate(val: string) {
					if (val.length) {
						if (
							helper.isAlreadyExist(
								helper.config.componentsDir,
								val,
								true
							)
						) {
							return 'Already added use new compoment name';
						}

						return true;
					}

					return 'Cannot be empty'
				}
			},
			{
				default: false,
				message: 'Do you want to connect store',
				name: 'isConnectStore',
				type: 'confirm',
			},
			{
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
				],
				message: 'Do you want to create a new reducer or use your own ?',
				name: 'isHaveReducer',
				type: 'list',
				when: ({ isConnectStore }) => isConnectStore
			},
			{
				default: true,
				message: 'Do you want styles file',
				name: 'isHaveStyle',
				type: 'confirm'
			}
		];

		const answers: { fileName: string, isHaveStyle: boolean, isHaveReducer:
			 boolean, isConnectStore: boolean } = await inquirer.prompt<{ fileName: string, isHaveStyle: boolean, isHaveReducer:
				boolean, isConnectStore: boolean }>(questions);

		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());

		helper.createClassComponent(answers);

		if (answers.isHaveStyle) {
			helper.createStyle(answers);
		}
		if (answers.isHaveReducer) {
			helper.addReducer(answers);
		}
	}
};
