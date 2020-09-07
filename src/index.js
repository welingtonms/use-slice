import React from 'react';

function useSlice(name, initialState, reducers) {
  function getTypeName(type) {
    return `${name}/${type}`;
  }

  function initializeActions() {
    logger.debug('[useSlice] Initializeing actions for slice', name);

    let actions = {};

    for (let type in reducers) {
      actions[type] = function createAction(payload) {
        return {
          type: getTypeName(type),
          payload,
        };
      };
      actions[type].type = getTypeName(type);
    }

    return actions;
  }

  function initializeReducers() {
    let reducersByActionType = {};

    for (let type in reducers) {
      reducersByActionType[getTypeName(type)] = reducers[type];
    }

    return reducersByActionType;
  }

  function reducer(state, action) {
    const reducerByActionType = reducersByActionType.current[action.type];

    if (reducerByActionType != null) {
      return reducerByActionType(state, action);
    }

    return state;
  }

  const actions = React.useRef(initializeActions());
  const reducersByActionType = React.useRef(initializeReducers());

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return {
    actions: actions.current,
    dispatch,
    state,
  };
}

export { useSlice };
