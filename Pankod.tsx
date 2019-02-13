//#region Global Imports
import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IPankod, IStore } from '@Interfaces';
//#endregion Global Imports

//#region Local Imports
import './style.scss';
//#endregion Local Imports

//#region Interface Imports
import { IPankod } from '@Interfaces';
//#endregion Interface Imports

class Pankod extends React.Component<IPankod.IProps, IPankod.IState> {

	constructor(props: IPankod.IProps) {
		super(props);

		this.state = {
		};
	}

	public render(): JSX.Element {
		return (
			<div className="Pankod">
				Pankod 
			</div>
		);
	}
}

const mapStateToProps = (state: IStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => (

);

export default connect(mapStateToProps, mapDispatchToProps)(Pankod);

