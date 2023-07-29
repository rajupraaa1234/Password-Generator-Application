import React, { useContext } from "react";
import { View, Text } from 'react-native';
import { Header } from '@components';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@context/auth-context';



const AnalyticScreen = () => {

    const auth = useContext(AuthContext);
    const navigation = useNavigation();

    const onLeftIconClick = () => {
        auth.onProfileClick();
        navigation.navigate('ProfileScreen');
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Header leftClick={() => { onLeftIconClick() }} name="Analytics"/>
            <Text>AnalyticScreen</Text>
        </View>
    )
}

export default AnalyticScreen;