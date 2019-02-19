import * as inquirer from 'inquirer';
import * as helper from './helper';

export const funcComp = {
	showQuestions: async (): Promise<void> => {
		const questions = [
			{
				message: 'Enter functional component name',
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

					return 'Cannot be empty';
				}
			},
			{
				default: true,
				message: 'Do you want style ?',
				name: 'isHaveStyle',
				type: 'confirm'
			},
		];


		const answers: { fileName: string, isHaveStyle: boolean } =
			await inquirer.prompt<{ fileName: string, isHaveStyle: boolean }>(questions);

		helper.createFuncComponent(answers);
		if (answers.isHaveStyle) {
			helper.createStyle(answers)
		}

	}
};
