import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from '../screen/onBoardingScreen';
import LoginScreen from '../screen/Login/LoginScreen';
import HomeScreen from '../screen/HomeScreen/HomeScreen';
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

const DashboardStackNavigator = createNativeStackNavigator();
export const DashBoardNavigator = () => {
    return (
        <DashboardStackNavigator.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <DashboardStackNavigator.Screen
                name='HomeScreen'
                component={HomeScreen}
            />
        </DashboardStackNavigator.Navigator>
    )
}



