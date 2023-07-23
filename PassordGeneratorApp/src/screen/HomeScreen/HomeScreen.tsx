import React from "react";
import {View,Text} from 'react-native';
import {Header} from '@components';



const HomeScreen = () => {
    return (
        <View style={{flex:1,flexDirection:'column'}}>
            
            <Header/>
            <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen;