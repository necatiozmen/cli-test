import * as fs from 'fs';
import * as mustache from 'mustache';
import * as path from 'path';
import { DefinationsModel } from './Defination';

export const Config = {
	componentsDir: '../../../Components',
	defConstDir: '../../../Definations',
	pagesDir: '../../../pages',
	reducerDir: '../../../Redux/Reducers',
	reducersListDir: '../../../Redux',
	storeDir: '../../../Redux'
};

export const Helper = {

	isAlreadyExist: (startPath: string, val: string): boolean => {
		val = val.replace(/\b\w/g, foo => foo.toUpperCase());

		return fs.existsSync(path.resolve(__dirname, `${startPath}/${val}`));
	},

	getTemplate: (templatePath: string, templateProps: DefinationsModel.ITemplateProps) => (
		mustache.render(
			fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8'),
			templateProps
		)
	),

	writeFile: (params: DefinationsModel.IWriteFile) => {

		fs.writeFile(path.resolve(__dirname, params.dirPath),
			params.getFileContent()
			, err => {
				if (err) throw err;
				console.log(params.message);
			})
	},

	createFile: (dirPath: string): void => {
		fs.mkdirSync(path.resolve(__dirname, dirPath));
	},

	addIndex: (params: DefinationsModel.IAddIndex): void => {
		fs.appendFile(path.resolve(__dirname, params.dirPath),
			`${params.getFileContent()}\n`,
			err => {
				if (err) throw err;
				console.log("asdasd", params.message);
			}
		);
	},

	createInterface: (answers: DefinationsModel.IAnswers, isClass: boolean) => {
		const templatePath = '../templates/interfaces/component.d.mustache';
		const templateProps = { fileName: answers.fileName, isClass };

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: `${answers.isPage ? Config.pagesDir : Config.componentsDir}/${answers.fileName}/${answers.fileName}.d.ts`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Created new interface file.'
		};

		Helper.writeFile(writeFileProps);
	},

	createStyle: (answers: DefinationsModel.IAnswers): void => {
		const templatePath = '../templates/styles.mustache';
		const templateProps = { fileName: answers.fileName };

		const writeFileProps = {
			dirPath: `${answers.isPage ? Config.pagesDir : Config.componentsDir}/${answers.fileName}/style.scss`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Created new style file'
		};

		Helper.writeFile(writeFileProps);
	},

	replaceContent: (params: DefinationsModel.IReplaceContent): void => {
		const replaceFile = params.filetoUpdate.replace(params.regexKey, params.getFileContent());

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: params.fileDir,
			getFileContent: () => replaceFile,
			message: params.message
		}

		Helper.writeFile(writeFileProps);
	},

	addActionConstIndex: (templateProps: DefinationsModel.ITemplateProps): void => {
		const replaceContentParams: DefinationsModel.IReplaceContent = {
			fileDir: '../../../Definations/ActionConsts.ts',
			filetoUpdate: fs.readFileSync(path.resolve(__dirname, `${Config.defConstDir}/ActionConsts.ts`), 'utf8'),
			getFileContent: () => Helper.getTemplate('../templates/reducers/action-const.mustache', templateProps),
			message: 'Added to actionConsts',
			regexKey: /export const ActionConsts\s[=]\s[{]/g
		};

		Helper.replaceContent(replaceContentParams);
	},

	addStoreIndex: (templateProps: DefinationsModel.ITemplateProps): void => {
		const replaceContentParams: DefinationsModel.IReplaceContent = {
			fileDir: `${Config.storeDir}/store.ts`,
			filetoUpdate: fs.readFileSync(path.resolve(__dirname, `${Config.storeDir}/store.ts`), 'utf8'),
			getFileContent: () => Helper.getTemplate('../templates/reducers/store.mustache', templateProps),
			message: 'Added to store.ts',
			regexKey: /const reducers = combineReducers[(][{]/g
		};

		Helper.replaceContent(replaceContentParams);
	},

	addReducer: (answers: DefinationsModel.IAnswers): void => {
		const redDir = `${Config.reducerDir}/${answers.fileName}`;
		const reducerTemplate = '../templates/reducers/reducer.mustache';
		const templateProps = { fileName: answers.fileName };
		const indexTemplate = '../templates/reducers/index.mustache';

		const addIndexParams: DefinationsModel.IAddIndex = {
			dirPath: `${Config.reducerDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexTemplate, templateProps),
			message: 'Reducer added to index.ts'
		};

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: `${redDir}/index.tsx`,
			getFileContent: () => Helper.getTemplate(reducerTemplate, templateProps),
			message: 'Created new style file'
		};

		Helper.createFile(redDir);
		Helper.writeFile(writeFileProps);
		Helper.addIndex(addIndexParams);
		Helper.addStoreIndex(templateProps);
		Helper.addActionConstIndex(templateProps);
	},

	createClassComponent: (answers: DefinationsModel.IAnswers): void => {
		const classDir = `${answers.isPage ? Config.pagesDir : Config.componentsDir}/${answers.fileName}`;
		const templatePath = '../templates/components/class.mustache';
		const templateProps = {
			fileName: answers.fileName, interfaceName: `I${answers.fileName}`,
			isConnectStore: answers.isConnectStore, isHaveStyle: answers.isHaveStyle
		};
		const indexTemplate = '../templates/components/index.mustache';

		const addIndexParams: DefinationsModel.IAddIndex = {
			dirPath: `${Config.componentsDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexTemplate, templateProps),
			message: 'Component added to index.ts'
		};

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: `${classDir}/index.tsx`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Added new class based component'
		};

		Helper.createFile(classDir);
		Helper.writeFile(writeFileProps);
		Helper.createInterface(answers, true);

		if (!answers.isPage) {
			Helper.addIndex(addIndexParams);
		}
	},

	createFuncComponent: (answers: DefinationsModel.IAnswers): void => {
		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		const funcDir = `${Config.componentsDir}/${answers.fileName}`;
		const templatePath = '../templates/components/functional.mustache';
		const templateProps = {
			fileName: answers.fileName, interfaceName: `I${answers.fileName}`,
			isHaveStyle: answers.isHaveStyle
		};
		const indexTemplate = '../templates/components/index.mustache';

		const addIndexParams: DefinationsModel.IAddIndex = {
			dirPath: `${Config.componentsDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexTemplate, templateProps),
			message: 'Component added to index.ts'
		};

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: `${funcDir}/index.tsx`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Created new functional component'
		};

		Helper.createFile(funcDir);
		Helper.writeFile(writeFileProps);
		Helper.addIndex(addIndexParams);
		Helper.createInterface(answers, false);
	}
}
/* const createFuncComponent = (answers) => {
	answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
	const funcDir = `${Config.componentsDir}/${answers.fileName}`;
	const templatePath = '../templates/components/functional.mustache'
	const templateProps = {
		fileName: answers.fileName, interfaceName: `I${answers.fileName}`,
		isHaveStyle: answers.isHaveStyle
	}
	const message = "Created new functional component";
	const indexDir = `${Config.componentsDir}/index.ts`;
	const indexTemplate = '../templates/components/index.mustache';
	const indexMessage = "Component added to index.ts";

	createFile(funcDir);
	writeFile(`${funcDir}/index.tsx`, () => getTemplate(templatePath, templateProps), message);
	addIndex(indexDir, () => getTemplate(indexTemplate, templateProps), indexMessage);
	createInterface(answers);
}
 */

/*
const createClassComponent = (answers) => {
	const classDir = `${answers.isPage ? Config.pagesDir : Config.componentsDir}/${answers.fileName}`;

	const templatePath = '../templates/components/class.mustache';
	const templateProps = {
		fileName: answers.fileName, interfaceName: `I${answers.fileName}`,
		isConnectStore: answers.isConnectStore, isHaveStyle: answers.isHaveStyle
	}
	const indexDir = `${Config.componentsDir}/index.ts`;
	const message = "Added new class based component";
	const indexTemplate = '../templates/components/index.mustache';
	const indexMessage = "Component added to index.ts";

	createFile(classDir);
	writeFile(`${classDir}/index.tsx`, () => getTemplate(templatePath, templateProps), message);
	createInterface(answers, isClass = true);

	if (!answers.isPage) {
		addIndex(indexDir, () => getTemplate(indexTemplate, templateProps), indexMessage);
	}
}
 */
/* const addReducer = (answers) => {
	const redDir = `${Config.reducerDir}/${answers.fileName}`;
	const reducerTemplate = '../templates/reducers/reducer.mustache'
	const templateProps = { fileName: answers.fileName };
	const message = "Created new reducer file"
	const indexDir = `${Config.reducerDir}/index.ts`;
	const indexTemplate = '../templates/reducers/index.mustache';
	const indexMessage = "Reducer added to index.ts";

	createFile(redDir);
	writeFile(`${redDir}/index.tsx`, () => getTemplate(reducerTemplate, templateProps), message);
	addIndex(indexDir, () => getTemplate(indexTemplate, templateProps), indexMessage)
	addStoreIndex(templateProps);
	addActionConstIndex(templateProps);
}; */

/* const addStoreIndex = (templateProps) => {
	const storeRegex = /const reducers = combineReducers[(][{]/g;
	const storeTemplate = '../templates/reducers/store.mustache';
	const storeMessage = "Added to store.ts";
	const storeDir = `${Config.storeDir}/store.ts`;
	const storeFile = fs.readFileSync(path.resolve(__dirname, storeDir), 'utf8');

	replaceContent(storeFile, storeRegex,
		() => getTemplate(storeTemplate, templateProps),
		storeDir, storeMessage);
}
 */
/* const addActionConstIndex = (templateProps) => {
	const actionConstsRegex = /export const ActionConsts\s[=]\s[{]/g;
	const actionConstFile = fs.readFileSync(path.resolve(__dirname, `${Config.defConstDir}/ActionConsts.ts`), 'utf8');
	const actionConstTemplate = '../templates/reducers/action-const.mustache';
	const actionConstDir = '../../Definations/ActionConsts.ts';
	const actionConstsMessage = "Added to actionConsts";

	replaceContent(actionConstFile, actionConstsRegex,
		() => getTemplate(actionConstTemplate, templateProps),
		actionConstDir, actionConstsMessage);

} */

/* const replaceContent = (filetoUpdate, regexKey, getFileContent, fileDir, message) => {
	const replaceFile = filetoUpdate.replace(regexKey, getFileContent());

	writeFile(fileDir, () => replaceFile, message)
} */

/* const createStyle = (answers) => {
	const styleDir = `${answers.isPage ? Config.pagesDir : Config.componentsDir}/${answers.fileName}/style.scss`;
	const templatePath = '../templates/styles.mustache';
	const templateProps = { fileName: answers.fileName };
	const message = "Created new style file";

	writeFile(styleDir, () => getTemplate(templatePath, templateProps), message);
} */

/* const createInterface = (answers, isClass) => {
	const interfaceDir = `${answers.isPage ? Config.pagesDir : Config.componentsDir}/${answers.fileName}/${answers.fileName}.d.ts`;
	const templatePath = '../templates/interfaces/component.d.mustache';
	const templateProps = { fileName: answers.fileName, isClass };
	const message = "Created new interface file."

	writeFile(interfaceDir, () => getTemplate(templatePath, templateProps), message);
} */

/* const addIndex = (dirPath, getFileContent, message) => {
	fs.appendFile(path.resolve(__dirname, dirPath),
		getFileContent() + "\n",
		(err) => {
			if (err) throw err;
			console.log(message);
		}
	);
} */

/* const createFile = dirPath => {
	console.log(path.resolve(__dirname, dirPath))
	fs.mkdirSync(path.resolve(__dirname, dirPath));
}
 */
/* const writeFile = (dirPath, getFileContent, message) => {
	fs.writeFile(path.resolve(__dirname, dirPath),
		getFileContent()
		, err => {
			if (err) throw err;
			console.log(message);
		})
} */

/* const getTemplate = (templatePath, templateProps) => (
	mustache.render(
		fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8'),
		templateProps
	)
); */
/*
module.exports = {
	Config,
	createFuncComponent,
	isAlreadyExist,
	createStyle,
	createClassComponent,
	addReducer
} */