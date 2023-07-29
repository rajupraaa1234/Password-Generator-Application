import React, { useEffect, useContext } from "react";
import { View, Text, BackHandler, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from '@components';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@context/auth-context';
import { useStore } from '@mobx/hooks';
import { setAsValue } from '@utils';


const ProfileScreen = () => {
    const navigation = useNavigation();
    const auth = useContext(AuthContext);
    const { appStore } = useStore();
    function handleBackButtonClick() {
        navigation.goBack();
        auth.onBackClick();
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    const logout = async () => {
        appStore.setCurrentUser('');
        await setAsValue("currentUser", '');
        handleBackButtonClick();
        auth.logout();
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Header leftIcon={'backward'} leftClick={handleBackButtonClick} name={'Profile'} />
            <View style={{ position: 'relative', flex: 1 }}>
                <TouchableOpacity style={style.LogoutBtnContainer} onPress={logout}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    LogoutBtnContainer: {
        height: 40,
        position: 'absolute',
        width: 100,
        borderBlockColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
        borderWidth: 3,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
        marginRight: 40,
        bottom: 0,
        right: 0
    }
})

export default ProfileScreen;