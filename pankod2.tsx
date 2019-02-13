//#region Global Imports
import * as React from 'react';

//#endregion Global Imports

//#region Local Imports
import './style.scss';
//#endregion Local Imports

//#region Interface Imports
import { Ipankod2 } from '@Interfaces';
//#endregion Interface Imports

class pankod2 extends React.Component<Ipankod2.IProps, Ipankod2.IState> {

	constructor(props: Ipankod2.IProps) {
		super(props);

		this.state = {
		};
	}

	public render(): JSX.Element {
		return (
			<div className="pankod2">
				pankod2 
			</div>
		);
	}
}


export default pankod2;
