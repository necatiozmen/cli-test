//#region Global Imports
import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IPagecomp, IStore } from '@Interfaces';
//#endregion Global Imports

//#region Local Imports
import './Styles.scss';
//#endregion Local Imports

//#region Interface Imports
import { IPagecomp } from './IPagecomp';
//#endregion Interface Imports

class Pagecomp extends React.Component<IPagecomp.IProps, IPagecomp.IState> {

	constructor(props: IPagecomp.IProps) {
		super(props);

		this.state = {
		};
	}

	public render(): JSX.Element {
		return (
			<div className="Pagecomp">
				Pagecomp 
			</div>
		);
	}
}

const mapStateToProps = (state: IStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => (

);

export default connect(mapStateToProps, mapDispatchToProps)(Pagecomp);

