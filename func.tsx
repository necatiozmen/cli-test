//#region Global Imports
import React from 'react';
//#endregion Global Imports

import './style.scss';

//#region Interface Imports
import { Ifunc } from './InfoCard';
//#endregion Interface Imports

export const func = (props: Ifunc.IProps): JSX.Element => (
	<div className="func">
		<span>func</span>
	</div>
);