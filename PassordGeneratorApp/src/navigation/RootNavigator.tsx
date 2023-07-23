import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginNavigator, DashBoardNavigator } from './AppNavigaor';

import { observer } from 'mobx-react';
import StartupScreen from '../screen/StartupScreen';
import { useStore } from '@mobx/hooks';
import { AuthContext } from '@context/auth-context';
import SplashScreen from 'react-native-splash-screen'


const RootNavigator = () => {
    const [initial, setInitial] = useState(false);
    const { appStore } = useStore();
    const currUser = appStore.currentUser;
    const auth = useContext(AuthContext);
    const isAuth = auth.isAuth;
    useEffect(() => {
        setTimeout(() => {
            setInitial(true);
            SplashScreen.hide();
        }, 1000)
    });
    return (
        <NavigationContainer>
            {currUser || isAuth ? <DashBoardNavigator /> : initial ? <LoginNavigator /> : <StartupScreen />}
        </NavigationContainer>
    )
}


export default observer(RootNavigator);