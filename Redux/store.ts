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
        Necati: Reducers.NecatiReducer,
        Classtest4: Reducers.Classtest4Reducer,
        Testclass2: Reducers.Testclass2Reducer,
        ClassComp1: Reducers.ClassComp1Reducer,
        Pagetest2: Reducers.Pagetest2Reducer,
        PAGE1: Reducers.PAGE1Reducer,
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
