import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginNavigator, DashBoardNavigator } from './AppNavigaor';

import { observer } from 'mobx-react';
import StartupScreen from '../screen/StartupScreen';
import { useStore } from '@mobx/hooks';
import SplashScreen from 'react-native-splash-screen'


const RootNavigator = () => {
    const [initial, setInitial] = useState(false);
    const { appStore } = useStore();
    const currUser = appStore.currentUser;
    useEffect(() => {
        setTimeout(() => {
            setInitial(true);
            SplashScreen.hide();
        }, 1000)
    });
    return (
        <NavigationContainer>
            {currUser ? <DashBoardNavigator /> : initial ? <LoginNavigator /> : <StartupScreen />}
        </NavigationContainer>
    )
}


export default observer(RootNavigator);