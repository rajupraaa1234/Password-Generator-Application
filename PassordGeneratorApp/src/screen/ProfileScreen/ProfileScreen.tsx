import React, { useEffect, useContext } from "react";
import { View, Text, BackHandler, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Header } from '@components';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@context/auth-context';
import { useStore } from '@mobx/hooks';
import { UserPlaceHolder } from '@images';
import { setAsValue } from '@utils';


const ProfileScreen = () => {
    const navigation = useNavigation();
    const auth = useContext(AuthContext);
    const { appStore } = useStore();
    const user = appStore.currentUser;
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
            <Header leftIcon={'backward'} leftClick={handleBackButtonClick} name={'Profile'} isRight={false} isLeft={true} />
            <View style={{ position: 'relative', flex: 1 }}>
                <View style={{ height: 150, width: 150, justifyContent: 'center', alignSelf: 'center', marginTop: 30, borderRadius: 20 }}>
                    <Image source={UserPlaceHolder} resizeMode="contain" style={{ height: '100%', width: '100%', borderRadius: 20 }} />
                </View>
                <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 25 }}>Hey {user}</Text>
                </View>
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