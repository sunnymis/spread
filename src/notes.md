# Setting up a React/Redux Typescript App

1. Initial create react App
2. Add Provider to the <App> component 
3. Provider needs a store so create a simple store with createStore(). 
4. createStore needs a reducer - use combineReducers to create a single reducer
5. Create a reducer that just returns the current state. It takes in the initial state by default
6. compose()(App) 
  6a. This creates another component around our App component that injects props to it 
7. Add mapstatetoprops to compose compose(connect(mapStateToProps))(App)
8. Add actions and actiontypes 
9. Add mapDispatch to props and dispatch action type 
10. Add action to reducer 
11. Type out State
12.  ReturnType<typeof reducers> returns the shape of the return type of combineReducers which is the app state. Hover over AppState
and see that it's a readonly combined state
13. Add State return type to reducer
