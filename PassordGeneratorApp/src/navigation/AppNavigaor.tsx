import React , {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from '../screen/onBoardingScreen';
import LoginScreen from '../screen/Login/LoginScreen';
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen/ProfileScreen';
import AnalyticScreen from '../screen/AnalyticScreen/AnalyticScreen';
import SearchScreen from '../screen/SearchScreen/SearchScreen';
import SettingScreen from '../screen/Setting/SettingScreen';
import { useStore } from '@mobx/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import User from 'react-native-vector-icons/EvilIcons';
import Setting from 'react-native-vector-icons/AntDesign';
import AddPasswordScreen from '../screen/AddPasswordScreen/AddPasswordScreen';
import { AuthContext } from '@context/auth-context';
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

const HomeStack = () => {
    return (
        <LoginStackNavigator.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <DashboardStackNavigator.Screen
                name="HomeScreen"
                component={HomeScreen}
            />

           <DashboardStackNavigator.Screen
                name="ProfileScreen"
                component={ProfileScreen}
            />
            
            <DashboardStackNavigator.Screen
                name="AddPasswordScreen"
                component={AddPasswordScreen}
            />
        </LoginStackNavigator.Navigator>
    )
}
export const DashBoardNavigator = () => {
    const auth = useContext(AuthContext);
    const isProfileClick = auth.isProfileClick;
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                paddingHorizontal: 5,
                paddingTop: 0,
                position: 'absolute',
                borderTopWidth: 0,
                display:'none'
            },
        })}>
            
            <Tab.Screen name={'HomeScreen'} component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={18} color={color} />
                    ),
                    inactiveTintColor: 'black',
                    activeTintColor: 'white',
                    tabBarStyle: {
                        height: 50,
                        display : isProfileClick ? 'none' : 'flex'
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
                    }
                }} />
            <Tab.Screen name={'Search'} component={SearchScreen}
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
            <Tab.Screen name={'Setting'} component={SettingScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Setting name="setting" size={18} color={color} />
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



