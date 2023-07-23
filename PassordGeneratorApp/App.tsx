/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  LogBox,
} from 'react-native';
import { TestComponent } from '@components';
import RootNavigator from '@navigation/RootNavigator';
import { NativeBaseProvider } from 'native-base';
import { AuthContext } from '@context/auth-context';

LogBox.ignoreAllLogs();




const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const login = () => {
    console.log(`login ------> login{}`)
    setIsAuth(true);
  }

  const logout = () => {
    setIsAuth(false);
  }

  return (
    <NativeBaseProvider>
      <AuthContext.Provider
        value={{
          isAuth,
          login,
          logout,
        }}>
        <RootNavigator />
      </AuthContext.Provider>
    </NativeBaseProvider>
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
