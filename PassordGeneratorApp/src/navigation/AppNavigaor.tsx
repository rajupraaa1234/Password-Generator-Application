import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from '../screen/onBoardingScreen';
import LoginScreen from '../screen/Login/LoginScreen';
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen/ProfileScreen';
import AnalyticScreen from '../screen/AnalyticScreen/AnalyticScreen';
import SearchScreen from '../screen/SearchScreen/SearchScreen';
import { useStore } from '@mobx/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import User from 'react-native-vector-icons/EvilIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


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
const Tab = createBottomTabNavigator();
export const DashBoardNavigator = () => {

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,

            tabBarStyle: {
                paddingHorizontal: 5,
                paddingTop: 0,
                position: 'absolute',
                borderTopWidth: 0,
            },
        })}>
            <Tab.Screen name={'HomeScreen'} component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={18} color={color} />
                    ),
                    inactiveTintColor: 'black',
                    activeTintColor: 'white',
                    tabBarStyle: {
                        height: 50,
                        //backgroundColor : 'rgba(34,36,40,1)'
                    }

                }} />
            <Tab.Screen name={'Analysis'} component={AnalyticScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon1 name="analytics" size={18} color={color} />
                    ),
                    inactiveTintColor: 'black',
                    activeTintColor: 'white',
                    tabBarStyle: {
                        height: 50,
                        //  backgroundColor : 'rgba(34,36,40,1)'
                    }
                }} />
            <Tab.Screen name={'SearchScreen'} component={SearchScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <User name="search" size={18} color={color} />
                    ),
                    inactiveTintColor: 'black',
                    activeTintColor: 'white',
                    tabBarStyle: {
                        height: 50,
                        //  backgroundColor : 'rgba(34,36,40,1)'
                    }
                }} />
            <Tab.Screen name={'ProfileScreen'} component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <User name="user" size={18} color={color} />
                    ),
                    inactiveTintColor: 'black',
                    activeTintColor: 'white',
                    tabBarStyle: {
                        height: 50,
                        //  backgroundColor : 'rgba(34,36,40,1)'
                    }
                }} />

        </Tab.Navigator>
    )
}



