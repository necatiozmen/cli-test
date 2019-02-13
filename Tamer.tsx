//#region Global Imports
import * as React from 'react';

//#endregion Global Imports

//#region Local Imports
import './style.scss';
//#endregion Local Imports

//#region Interface Imports
import { ITamer } from '@Interfaces';
//#endregion Interface Imports

class Tamer extends React.Component<ITamer.IProps, ITamer.IState> {

	constructor(props: ITamer.IProps) {
		super(props);

		this.state = {
		};
	}

	public render(): JSX.Element {
		return (
			<div className="Tamer">
				Tamer 
			</div>
		);
	}
}


export default Tamer;
