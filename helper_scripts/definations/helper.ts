import * as fs from 'fs';
import * as mustache from 'mustache';
import * as path from 'path';
import { DefinationsModel } from './Defination';

export const Config = {
	componentsDir: './Components',
	defConstDir: './Definations',
	pagesDir: './pages',
	reducerDir: './Redux/Reducers',
	reducersListDir: './Redux',
	storeDir: './Redux',
	routesDir: './app'
};

export const Helper = {

	addRoute: (answers: DefinationsModel.IAnswers) => {
		const templateProps = { fileName: answers.fileName, routePath: answers.routePath, isHavePath: answers.isHavePath };

		const replaceContentParams: DefinationsModel.IReplaceContent = {
			fileDir: `${Config.routesDir}/routes.js`,
			filetoUpdate: fs.readFileSync(path.resolve('', `${Config.routesDir}/routes.js`), 'utf8'),
			getFileContent: () => Helper.getTemplate('./helper_scripts/templates/routes.mustache', templateProps),
			message: 'Added route path to routes.js',
			regexKey: /^(?:[\t ]*(?:\r?\n|\r))+module.exports = routes;/g
		};

		Helper.replaceContent(replaceContentParams);
	},

	isAlreadyExist: (startPath: string, val: string): boolean => {
		val = val.replace(/\b\w/g, foo => foo.toUpperCase());

		return fs.existsSync(path.resolve('', `${startPath}/${val}`));
	},

	getTemplate: (templatePath: string, templateProps: DefinationsModel.ITemplateProps): string => (
		mustache.render(
			fs.readFileSync(path.resolve('', templatePath), 'utf8'),
			templateProps
		)
	),

	writeFile: (params: DefinationsModel.IWriteFile) => {

		fs.writeFile(
			path.resolve('', params.dirPath),
			params.getFileContent(),
			err => {
				if (err) throw err;
				console.log(params.message);
			}
		);
	},

	createFile: (dirPath: string): void => {
		fs.mkdirSync(path.resolve('', dirPath));
	},

	addIndex: (params: DefinationsModel.IAddIndex): void => {
		fs.appendFile(
			path.resolve('', params.dirPath),
			`${params.getFileContent()}\n`,
			err => {
				if (err) throw err;
				console.log(params.message);
			}
		);
	},

	createInterface: (answers: DefinationsModel.IAnswers, isClass: boolean) => {
		const templatePath = './helper_scripts/templates/interfaces/component.d.mustache';
		const templateProps = { fileName: answers.fileName, isClass };

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: `${answers.isPage ? Config.pagesDir : Config.componentsDir}/${answers.fileName}/${answers.fileName}.d.ts`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Created new interface file.'
		};

		Helper.writeFile(writeFileProps);
	},

	createStyle: (answers: DefinationsModel.IAnswers): void => {
		const templatePath = './helper_scripts/templates/styles.mustache';
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
		};

		Helper.writeFile(writeFileProps);
	},

	addActionConstIndex: (templateProps: DefinationsModel.ITemplateProps): void => {
		const replaceContentParams: DefinationsModel.IReplaceContent = {
			fileDir: `${Config.defConstDir}/ActionConsts.ts`,
			filetoUpdate: fs.readFileSync(path.resolve('', `${Config.defConstDir}/ActionConsts.ts`), 'utf8'),
			getFileContent: () => Helper.getTemplate('./helper_scripts/templates/reducers/action-const.mustache', templateProps),
			message: 'Added to actionConsts',
			regexKey: /export const ActionConsts\s[=]\s[{]/g
		};

		Helper.replaceContent(replaceContentParams);
	},

	addStoreIndex: (templateProps: DefinationsModel.ITemplateProps): void => {
		const replaceContentParams: DefinationsModel.IReplaceContent = {
			fileDir: `${Config.storeDir}/store.ts`,
			filetoUpdate: fs.readFileSync(path.resolve('', `${Config.storeDir}/store.ts`), 'utf8'),
			getFileContent: () => Helper.getTemplate('./helper_scripts/templates/reducers/store.mustache', templateProps),
			message: 'Added to store.ts',
			regexKey: /const reducers = combineReducers[(][{]/g
		};

		Helper.replaceContent(replaceContentParams);
	},

	addReducer: (answers: DefinationsModel.IAnswers): void => {
		const redDir = `${Config.reducerDir}/${answers.fileName}`;
		const reducerTemplate = './helper_scripts/templates/reducers/reducer.mustache';
		const templateProps = { fileName: answers.fileName };
		const indexTemplate = './helper_scripts/templates/reducers/index.mustache';

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
		const templatePath = './helper_scripts/templates/components/class.mustache';
		const templateProps = {
			fileName: answers.fileName, interfaceName: `I${answers.fileName}`,
			isConnectStore: answers.isConnectStore, isHaveStyle: answers.isHaveStyle
		};
		const indexTemplate = './helper_scripts/templates/components/index.mustache';

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
		const templatePath = './helper_scripts/templates/components/functional.mustache';
		const templateProps = {
			fileName: answers.fileName, interfaceName: `I${answers.fileName}`,
			isHaveStyle: answers.isHaveStyle
		};
		const indexTemplate = './helper_scripts/templates/components/index.mustache';

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
};
