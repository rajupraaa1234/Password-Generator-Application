import React from "react";
import {View,Text} from 'react-native';
import {Header} from '@components';



const ProfileScreen = () => {
    return (
        <View style={{flex:1,flexDirection:'column'}}>
            
            <Header/>
            <Text>ProfileScreen</Text>
        </View>
    )
}

export default ProfileScreen;