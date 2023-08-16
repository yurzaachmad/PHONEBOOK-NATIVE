import React from 'react';
import {StyleSheet} from 'react-native';

import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './src/reducers';

import {Provider} from 'react-redux';
import PhoneAdd from './src/components/PhoneAdd';
import PhoneBox from './src/components/PhoneBox';
import Avatar from './src/components/PhoneAvatar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const store = createStore(reducer, applyMiddleware(thunk));

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={PhoneBox}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Add"
            component={PhoneAdd}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UpdateAvatar"
            component={Avatar}
            options={{headerShown: false}}
          />
          {/* <Avatar /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
});

export default App;