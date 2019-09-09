import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
// import store from './redux/store';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';


import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const initialState = {
    restaurant: "vanessa dumpling",
    people: ["nobody"],
  }

  const restaurantReducer = (state = initialState, action) => {
    if (action.type === 'ADD_JOE') {
      return "joe's"
    }
    return state;
  }

  const peopleReducer = (state = initialState, action) => {
    switch(action.type) {
      case "ADD_PERSON":
        return {
          ...state,
          newPerson: "sunny"
        }
        break;
      default:
        return state;
    }
  }

  const reducers = combineReducers({
    restaurant: restaurantReducer,
    people: peopleReducer,
  })

  const restaurantMiddleware = (store) => next => action => {
    console.log('store in the middlware', store)
    console.log('next in the middlware', next)
    console.log('action in the middlware', action)

  }

  

  const middleware = applyMiddleware(restaurantMiddleware)

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  
  const store = createStore(reducers, initialState,  composeWithDevTools(middleware));
  
  console.log('Initial store', store.getState());
  store.dispatch({type: "ADD_JOE"})
  console.log('After dispatch', store.getState());
  store.dispatch({type: "ADD_PERSON"});
  console.log('After dispatch', store.getState());




  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider store={store}>
            <AppNavigator />
          </Provider>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
