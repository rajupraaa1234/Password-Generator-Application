/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  LogBox,
} from 'react-native';
import {TestComponent} from '@components';
import RootNavigator from '@navigation/RootNavigator';

LogBox.ignoreLogs([
  "No stops in gradient",
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  "RNGestureHandlerRootView will be removed",
  "GestureHandlerRootView will be removed",
]);




function App(): JSX.Element {
 
  return (
    <RootNavigator/>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
