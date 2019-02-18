//#region Global Imports
import createRavenMiddleware from 'raven-for-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';
//#endregion Global Imports

//#region Local Imports
import * as Reducers from '@Reducers';
import { RavenService } from '@Services';
//#endregion Local Imports

export const initStore = (initialState = {}) => {
	const reducers = combineReducers({
		vendor: Reducers.VendorReducer
	});

	const ravenInstance = RavenService.getRavenInstance();

	if (!ravenInstance) {
		return createStore(
			reducers,
			initialState,
			composeWithDevTools(
				applyMiddleware(thunkMiddleware)
			)
		);
	}

	return createStore(
		reducers,
		initialState,
		composeWithDevTools(
			applyMiddleware(
				thunkMiddleware,
				createRavenMiddleware(RavenService.getRavenInstance())
			)
		)
	);
};
