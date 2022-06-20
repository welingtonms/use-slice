import { renderHook, act } from '@testing-library/react-hooks';
import useSlice from './use-slice';

describe( 'useSlice', () => {
	it( 'handles slice correctly', () => {
		const initialState = 3;

		const { result } = renderHook( () =>
			useSlice( 'slice-test', initialState, {
				increment( state, action ) {
					const [ increment ] = action.payload;

					return state + increment;
				},
				decrement( state, action ) {
					const [ decrement ] = action.payload;

					return state - decrement;
				},
			} )
		);

		expect( result.current.state ).toBe( initialState );
		expect( result.current.actions ).not.toBeNull();

		expect( typeof result.current.actions.increment ).toBe( 'function' );
		expect( typeof result.current.actions.decrement ).toBe( 'function' );
		expect( typeof result.current.dispatch ).toBe( 'function' );

		// we can trigger actions through the actions object...
		const increment = 10;
		act( () => {
			const dispatch = result.current.dispatch;
			dispatch( result.current.actions.increment( increment ) );
		} );

		expect( result.current.state ).toBe( initialState + increment );

		act( () => {
			const dispatch = result.current.dispatch;
			dispatch( result.current.actions.decrement( increment ) );
		} );

		expect( result.current.state ).toBe( initialState );

		// and manually as well
		act( () => {
			const dispatch = result.current.dispatch;
			dispatch( {
				type: result.current.actions.increment.type,
				payload: [ increment ],
			} );
		} );

		expect( result.current.state ).toBe( initialState + increment );
	} );
} );
