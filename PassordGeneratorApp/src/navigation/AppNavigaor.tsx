import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardingScreen from '../screen/onBoardingScreen';

const LoginStackNavigator = createNativeStackNavigator();



export const LoginNavigator = () => {
    return (
        <LoginStackNavigator.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <LoginStackNavigator.Screen
                name="onBoardingScreen"
                component={OnBoardingScreen}
                
            />
        </LoginStackNavigator.Navigator>
    )
}

export default LoginNavigator;