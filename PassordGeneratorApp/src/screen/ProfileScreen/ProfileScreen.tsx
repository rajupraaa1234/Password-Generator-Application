import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, Text, BackHandler, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Header , CustomPopup } from '@components';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@context/auth-context';
import { useStore } from '@mobx/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { UserPlaceHolder } from '@images';
import TextInput from "react-native-text-input-interactive";
import { Toast } from "native-base";
import ToggleSwitch from 'toggle-switch-react-native'
import { setAsValue, getAsValue, isExpire } from '@utils';
import Icon2 from 'react-native-vector-icons/AntDesign';


const ProfileScreen = () => {
    const navigation = useNavigation();
    const auth = useContext(AuthContext);
    const { appStore } = useStore();
    const [isVisible, setVisible] = useState(false);
    const [newPassword,setNewPassword] = useState('');
    const [oldPassword,setOldPassword] = useState('');
    const user = appStore.currentUser;
    const [toggle, setToggle] = useState(false);
    function handleBackButtonClick() {
        navigation.goBack();
        auth.onBackClick();
        return true;
    }

    useEffect(() => {
        if (appStore.isTrustedDevice) {
            setToggle(true);
        }
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };

    }, []);


    useFocusEffect(
        useCallback(() => {
            checkSession();
        }, []),
    );

    const logout = async () => {
        appStore.setCurrentUser(null);
        await setAsValue("currentUser", '');
        await setAsValue('LastUpdatedTime', null);
        await setAsValue('isTrusted', "0");
        await setAsValue("isTrusted", "false");
        appStore.setTrustedDevice(false);
        handleBackButtonClick();
        auth.logout();
    }


    const checkSession = async () => {
        if (!appStore.isTrustedDevice) {
            const isTimeOut = await isExpire();
            if (isTimeOut) {
                logout();
            }
        }
    }

    const onToggleClick = async () => {
        if (!toggle) {
            await setAsValue('isTrusted', "1");
            await setAsValue('LastUpdatedTime', `${new Date()}`);
            appStore.setTrustedDevice(true);
        } else {
            await setAsValue('isTrusted', "0");
            await setAsValue('LastUpdatedTime', null);
            appStore.setTrustedDevice(false);
        }
        setToggle(!toggle);
    }

    const onResetClick = () => {
        checkSession();
        setVisible(true);
    }

    const updatePAssword = async ()  => {
        const currUser = appStore.currentUser;
        const userData = await getAsValue(currUser);
        const {password , user , data } = JSON.parse(userData);
        if(newPassword.length>=3) {
            if(password == oldPassword) {
                const newUser = {
                    user: user,
                    password: newPassword,
                    data : data
                };
                await setAsValue(user, JSON.stringify(newUser));
                if(!Toast.isActive(14)) {
                    Toast.show({
                        id: 14,
                        description: "Password Updated !",
                        placement: "bottom",
                    });
                }
            }else{
                if(!Toast.isActive(13)) {
                    Toast.show({
                        id: 13,
                        description: "Old Password Incorect !",
                        placement: "bottom",
                    });
                }
            }
        }else{
            if(!Toast.isActive(12)) {
                Toast.show({
                    id: 12,
                    description: "Minimum Password length should be 3",
                    placement: "bottom",
                });
            }
        }
    }
    const onPopupClose = () => {
        setVisible(false);
        if(oldPassword.length>0 && newPassword.length>0){
            updatePAssword();
        }
        setOldPassword('');
        setNewPassword('');
    }

    const onTextChanges = (value) => {
        setOldPassword(value);
    }

    const onNewPassChanges = (value) => {
        setNewPassword(value);
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
                <CustomPopup isVisible={isVisible} onClick={onPopupClose} onTextChange={onTextChanges} value={oldPassword} myStyle={{height:250}} placeholder={'Enter your old paasword'} >
                   <TextInput  textInputStyle={{ width: '80%', marginLeft: 0 , marginTop:20 }} originalColor="#9370db" placeholder="Enter your new paasword" value={newPassword} onChangeText={onNewPassChanges} />
                 </CustomPopup>
                <View style={style.btnBoundry}>
                    <Text style={{ fontSize: 18, padding: 10 }}>Trusted Device</Text>
                    <View style={{ padding: 10 }}>
                        <ToggleSwitch
                            isOn={toggle}
                            onColor="green"
                            offColor="red"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="medium"
                            onToggle={onToggleClick}
                        />
                    </View>
                </View>
                <View style={style.btnBoundry}>
                    <Text style={{ fontSize: 18, padding: 10 }}>Reset Password</Text>
                    <TouchableOpacity style={{ padding: 10 }} onPress={onResetClick}>
                       <Icon2 name="right" color="gray" size={25} />
                    </TouchableOpacity>
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
        marginRight: 20,
        bottom: 0,
        right: 0,
    },
    btnBoundry: {
        height: 50,
        width: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#7b68ee',
        alignSelf: 'center',
        marginTop: 20,
        position: 'relative',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'

    }
})

export default ProfileScreen;