//#region Global Imports
import * as React from 'react';

//#endregion Global Imports

//#region Local Imports
//#endregion Local Imports

//#region Interface Imports
import { IPagenoRecucer } from './IPagenoRecucer';
//#endregion Interface Imports

class PagenoRecucer extends React.Component<IPagenoRecucer.IProps, IPagenoRecucer.IState> {

	constructor(props: IPagenoRecucer.IProps) {
		super(props);

		this.state = {
		};
	}

	public render(): JSX.Element {
		return (
			<div className="PagenoRecucer">
				PagenoRecucer 
			</div>
		);
	}
}


export default PagenoRecucer;
