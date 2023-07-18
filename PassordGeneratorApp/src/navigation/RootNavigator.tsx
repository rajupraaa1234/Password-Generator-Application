import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginNavigator from './AppNavigaor';


const RootNavigator = () => {

     return(
        <NavigationContainer>
            <LoginNavigator/>
        </NavigationContainer>
     )
}


export default RootNavigator;