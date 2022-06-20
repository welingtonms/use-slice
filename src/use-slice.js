import React from 'react';

/**
 * useSlice hook.
 * @param {string} name - Slice name.
 * @param {*} initialState - Initial value for this slice.
 * @param {*} reducers - Object containing reducer functions to act upon this slice.
 */
function useSlice( name, initialState, reducers ) {
	function getTypeName( type ) {
		return `${ name }/${ type }`;
	}

	function initializeActions() {
		let actions = {};

		for ( let type in reducers ) {
			actions[ type ] = function createAction( ...args ) {
				return {
					type: getTypeName( type ),
					payload: [ ...args ],
				};
			};
			actions[ type ].type = getTypeName( type );
		}

		return actions;
	}

	function initializeReducers() {
		let reducersByActionType = {};

		for ( let type in reducers ) {
			reducersByActionType[ getTypeName( type ) ] = reducers[ type ];
		}

		return reducersByActionType;
	}

	function reducer( state, action ) {
		const reducerByActionType = reducersByActionType.current[ action.type ];

		if ( reducerByActionType != null ) {
			return reducerByActionType( state, action );
		}

		return state;
	}

	const reducersByActionType = React.useRef( initializeReducers() );
	const actions = React.useRef( initializeActions() );

	const [ state, dispatch ] = React.useReducer( reducer, initialState );

	return {
		actions: actions.current,
		dispatch,
		state,
	};
}

export default useSlice;
