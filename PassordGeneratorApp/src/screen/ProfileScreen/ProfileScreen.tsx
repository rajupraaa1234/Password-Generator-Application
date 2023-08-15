import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, Text, BackHandler, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Header, CustomPopup, CustomButton } from '@components';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@context/auth-context';
import { useStore } from '@mobx/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { UserPlaceHolder } from '@images';
import TextInput from "react-native-text-input-interactive";
import { Toast } from "native-base";
import ReactNativeBlobUtil from 'react-native-blob-util'
import RNFS from 'react-native-fs';
import { APP_VERSION } from '@env';
import ToggleSwitch from 'toggle-switch-react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { setAsValue, getAsValue, isExpire, getUserPasswordInHtmlFormate } from '@utils';
import Icon2 from 'react-native-vector-icons/AntDesign';
import DoneIcone from 'react-native-vector-icons/MaterialIcons';


const ProfileScreen = () => {
    const navigation = useNavigation();
    const auth = useContext(AuthContext);
    const { appStore } = useStore();
    const [isVisible, setVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [loader, setLoader] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [path, setPath] = useState('');
    const user = appStore.currentUser;
    const [toggle, setToggle] = useState(false);
    const [isGenerate, setGenerated] = useState(false);
    function handleBackButtonClick() {
        navigation.goBack();
        auth.onBackClick();
        return true;
    }

    const onStart = () => {
        setLoader(true);
    }

    const onEnd = () => {
        setLoader(false);
    }

    const showLoader = () => {
        onStart();
        setTimeout(() => {
            onEnd();
        }, 700);
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

    const updatePAssword = async () => {
        const currUser = appStore.currentUser;
        const userData = await getAsValue(currUser);
        const { password, user, data } = JSON.parse(userData);
        if (newPassword.length >= 3) {
            if (password == oldPassword) {
                const newUser = {
                    user: user,
                    password: newPassword,
                    data: data
                };
                await setAsValue(user, JSON.stringify(newUser));
                if (!Toast.isActive(14)) {
                    Toast.show({
                        id: 14,
                        description: "Password Updated !",
                        placement: "bottom",
                    });
                }
            } else {
                if (!Toast.isActive(13)) {
                    Toast.show({
                        id: 13,
                        description: "Old Password Incorect !",
                        placement: "bottom",
                    });
                }
            }
        } else {
            if (!Toast.isActive(12)) {
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
        if (oldPassword.length > 0 && newPassword.length > 0) {
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

    const onPdfGenerate = async () => {
        const currUser = appStore.currentUser;
        const userData = await getAsValue(currUser);
        const { data } = JSON.parse(userData);
        let userPassData = [];
        if (data) {
            let { Pririty, Entertainment, Study, Others, ECommerce, SocialMedia, Payment } = data;
            userPassData = [...Pririty.data, ...Entertainment.data, ...Study.data, ...Others.data, ...ECommerce.data, ...SocialMedia.data, ...Payment.data];
        } else {
            if (!Toast.isActive(15)) {
                Toast.show({
                    id: 15,
                    description: "No Password data available",
                    placement: "bottom",
                });
            }
            return;
        }
        showLoader();
        let options = {
            html: `${getUserPasswordInHtmlFormate(userPassData)}`,
            fileName: 'test6',
            directory: 'Documents',
        };
        let file = await RNHTMLtoPDF.convert(options)
        setPath(file.filePath);
        setGenerated(true);
        Toast.show({
            id: 70,
            description: "Password pdf generated",
            placement: "bottom",
        });
    }

    const onDownload = () => {
        const currUser = appStore.currentUser;
        const dirpath = RNFS.DownloadDirectoryPath;
        ReactNativeBlobUtil.fs.cp(`${path}`, `${dirpath}/${currUser}Password.pdf`)
            .then(() => {
                if (!Toast.isActive(65)) {
                    Toast.show({
                        id: 65,
                        description: "Password pdf saved in your download folder",
                        placement: "bottom",
                    });
                }
            })
            .catch((err) => {
                if (!Toast.isActive(16)) {
                    Toast.show({
                        id: 16,
                        description: "somwething went wrong",
                        placement: "bottom",
                    });
                }
            })

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
                <CustomPopup isVisible={isVisible} onClick={onPopupClose} onTextChange={onTextChanges} value={oldPassword} myStyle={{ height: 250 }} placeholder={'Enter your old paasword'} >
                    <TextInput textInputStyle={{ width: '80%', marginLeft: 0, marginTop: 20 }} originalColor="#9370db" placeholder="Enter your new paasword" value={newPassword} onChangeText={onNewPassChanges} />
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
                <View style={style.btnBoundry}>
                    <Text style={{ fontSize: 18, padding: 10 }}>Password Pdf Generate</Text>
                    <TouchableOpacity style={{ padding: 10 }} onPress={onPdfGenerate} disabled={isGenerate}>
                        {isGenerate ? <DoneIcone name="done" color="green" size={25} /> : <Icon2 name="right" color="gray" size={25} />}
                    </TouchableOpacity>
                </View>
                {isGenerate && <View style={{ marginTop: 20, marginLeft: 10 }}>
                    <CustomButton
                        width={150}
                        height={45}
                        onClick={() => { onDownload() }}
                        disabled={false}
                        myStyle={{ marginLeft: 10 }}
                        text={'Download'}
                    />
                </View>}
                {loader && <ActivityIndicator animating={loader} size="large" color="#0000ff" />}
                <View style={style.VersionContainer}>
                    <Text style={{ color: 'black', fontSize: 15 }}>App Version </Text>
                    <Text style={{ color: 'black', fontSize: 15 }}> {APP_VERSION}</Text>
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
    VersionContainer: {
        height: 40,
        position: 'absolute',
        marginLeft: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
        flexDirection: 'row',
        bottom: 0,
        left: 0,
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