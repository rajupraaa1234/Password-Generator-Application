import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from '../screen/onBoardingScreen';
import LoginScreen from '../screen/Login/LoginScreen';
import { useStore } from '@mobx/hooks';


const LoginStackNavigator = createNativeStackNavigator();
export const LoginNavigator = (props: any) => {
    const { appStore } = useStore();
    const initialRoute = appStore.skipped ? 'LoginScreen' : 'onBoardingScreen';
    return (
        <LoginStackNavigator.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerShown: false,
            }}>
            <LoginStackNavigator.Screen
                name="onBoardingScreen"
                component={OnBoardingScreen}
            />
            <LoginStackNavigator.Screen
                name="LoginScreen"
                component={LoginScreen}
            />
        </LoginStackNavigator.Navigator>
    )
}

export default LoginNavigator;