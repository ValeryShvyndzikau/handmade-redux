const createStore = (reducer, preloadedState = {}) => {
  let state = preloadedState;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(l => l(state));
  };

  // const subcribe = (listener) => listenetrs = [...listeners, listener];
  // const unsubscribe = (listener) => listeners.filter(l !== listener);
  // let see alternative unsubscribe method here

  const subscribe = listener => {
    listenetrs = [...listeners, listener];
    return () => listeners.filter(l !== listener);
  };

  dispatch({ type: "INIT" }); // itial state population, we get to reduce to make initial state

  return {
    getState,
    dispatch,
    subscribe
    //unsubscribe
  };
};

combineReducers({
  somePage: (state, action) => state,
  nested: combineReducers({
    deep1: (state, action) => state
  })
});

// you call it inside the each module, when difine it
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      nextState,
      key => {
        nextState[key] = reducers[key](state[key], action);

        return nextState;
      },
      {}
    );
  };
};

/*

// 33
// Wrap every object before passing to createReducer

export default function createReducer(initialState: ?{}, handlers: {}) {
  return function reducer(state: ?{} = initialState, action: {type: string, payload: Object}) {
    return typeof handlers[action.type] === 'function'
        ? handlers[action.type](state, action)
        : state;
  };
}

*/

// initial state populating model
const someReducer = (state = "default value", action) => {
  if ((action.type = "bla-bla-bla")) {
    // do updates
    // return new state
  }

  return state;
};

/**
 * @todo: Clarify realisation details
 */
const connect = (mapStateToProps, mapDispatchToProps) => Component => {
  return ({ context, ...ownProps }) => {
    const { state, dispatch } = component.context;
    const props = mapStateToProps(state, ownProps);

    return <Component {...props} {...ownProps} dispatch={dispatch} />;
  };
};
