import React , { useEffect } from "react";
import { View , Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen'


const OnBoardingScreen = () => {
    useEffect(()=>{
        SplashScreen.hide();
    });
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
            <Text>OnBoarding Screen</Text>
        </View>
    )
}

export default OnBoardingScreen;
