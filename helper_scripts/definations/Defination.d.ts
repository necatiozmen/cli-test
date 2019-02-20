
export declare module DefinationsModel {
	export interface IInquirerFunc {
		showQuestions(): Promise<void>;
	}

	export interface ITemplateProps {
		fileName: string;
		interfaceName?: string;
		isHaveStyle?: boolean;
		isConnectStore?: boolean;
		isClass?: boolean;
	}

	export interface IAnswers {
		fileName: string;
		interfaceName?: string;
		isHaveStyle?: boolean;
		isConnectStore?: boolean;
		isPage?: boolean;
		isHaveReducer?: boolean;
	}

	export interface IReplaceContent {
		filetoUpdate: string;
		regexKey: RegExp;
		getFileContent: Function;
		fileDir: string;
		message: string;
	}

	export interface IAddIndex {
		dirPath: string;
		getFileContent: Function;
		message: string;
	}

	export interface IWriteFile {
		dirPath: string;
		getFileContent: Function;
		message: string;
	}
}
