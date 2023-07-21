import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginNavigator from './AppNavigaor';
import { observer } from 'mobx-react';
import StartupScreen from '../screen/StartupScreen';
import SplashScreen from 'react-native-splash-screen'


const RootNavigator = () => {
    const [initial, setInitial] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setInitial(true);
            SplashScreen.hide();
        }, 1000)
    });
    return (
        <NavigationContainer>
            {initial ? <LoginNavigator /> : <StartupScreen />}
        </NavigationContainer>
    )
}


export default observer(RootNavigator);