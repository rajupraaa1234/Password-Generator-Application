import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, BackHandler, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Header, CustomButton, DropdownComponent, CustomPopup } from '@components';
import { useNavigation } from '@react-navigation/native';
import TextInput from "react-native-text-input-interactive";
import Icon1 from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import { AuthContext } from '@context/auth-context';
import { useFocusEffect } from '@react-navigation/native';
import { Toast } from "native-base";
import { generatePassword, dropDownData, newPasswordList, isExpire } from '@utils';
import { useStore } from '@mobx/hooks';
import Clipboard from '@react-native-clipboard/clipboard';
import Slider from "react-native-slider";
import { setAsValue, getAsValue, getType } from '@utils';


const AddPasswordScreen = () => {
    const auth = useContext(AuthContext);
    const navigation = useNavigation();
    const [value, setValue] = useState(3);
    const [isNumber, setNumber] = useState(false);
    const [isLargeAlphabet, setLargeAlphabet] = useState(false);
    const [isSpecial, setSpecial] = useState(false);
    const [isSmallAlphabet, setSmallAphabet] = useState(false);
    const [siteName, setSiteName] = useState('');
    const [email, setEmail] = useState('');
    const [generated, setGenerated] = useState('');
    const [copiedText, setCopiedText] = useState('');
    const [loader, setLoader] = useState(false);
    const [fisrt, setFirst] = useState(true);
    const [isVisible, setVisible] = useState(false);
    const [type, setType] = useState('');
    const [manualyPassword, setManualPassword] = useState('');
    const { appStore } = useStore();


    function handleBackButtonClick() {
        navigation.goBack();
        auth.onBackClick();
        return true;
    }

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    useEffect(() => {
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


    const onLeftIconClick = () => {
        handleBackButtonClick();
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

    const copyComponent = () => {
        return (
            <TouchableOpacity style={{ marginLeft: -15 }} onPress={copyToClipboard}>
                <Icon1 name="copy" size={30} color="#87ceeb" />
            </TouchableOpacity>
        )
    }
    const handleValueChange = (sliderValue) => {
        const roundedValue = Math.round(sliderValue);
        setValue(roundedValue);
    };

    const copyToClipboard = () => {
        if (generated.length > 0) {
            Clipboard.setString(generated);
        } else {
            if (!Toast.isActive(18)) {
                Toast.show({
                    id: 18,
                    description: "Please generate the password first",
                    placement: "bottom",
                });
            }
        }

    };
    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
    };

    const onGenerate = () => {
        checkSession();
        if (siteName.length == 0 || email.length == 0) {
            if (!Toast.isActive(16)) {
                Toast.show({
                    id: 16,
                    description: "Please enter site & email both to generate strong password",
                    placement: "bottom",
                });
            }
            return;
        }

        if (!isLargeAlphabet && !isSpecial && !isNumber && !isSmallAlphabet) {
            if (!Toast.isActive(17)) {
                Toast.show({
                    id: 17,
                    description: "Please select at least one password formate",
                    placement: "bottom",
                });
            }
            return;
        }
        const generatedPassword = generatePassword(value, isLargeAlphabet, isSmallAlphabet, isNumber, isSpecial);
        setFirst(false);
        showLoader();
        setGenerated(generatedPassword);
    }
    const onTypeSelect = (item) => {
        checkSession();
        setType(item.label);
    }

    const saveData = async (data: any, isData: boolean) => {
        const user = appStore.currentUser;
        let userData = await getAsValue(`${user}`);
        let newUserData = data;
        const currentData = {
            site: siteName,
            email: email,
            password: generated,
            length: value
        }

        let { Pririty, Entertainment, Study, Others, ECommerce, SocialMedia, Payment } = newUserData;
        let currType = getType(type);
        if (currType == 'Pririty') {
            Pririty.data.push(currentData);
        } else if (currType == 'Entertainment') {
            Entertainment.data.push(currentData);
        } else if (currType == 'Study') {
            Study.data.push(currentData);
        } else if (currType == 'Others') {
            Others.data.push(currentData);
        } else if (currType == 'ECommerce') {
            ECommerce.data.push(currentData);
        } else if (currType == 'SocialMedia') {
            SocialMedia.data.push(currentData);
        } else {
            Payment.data.push(currentData);
        }
        let newUpdatedUserData = JSON.parse(userData);
        Object.assign(newUpdatedUserData, { data: newUserData });
        await setAsValue(`${user}`, JSON.stringify(newUpdatedUserData));
    }

    const onSaveClick = async () => {
        checkSession();
        if (siteName.length == 0 || email.length == 0 || generated.length == 0 || type.length == 0) {
            if (!Toast.isActive(20)) {
                Toast.show({
                    id: 20,
                    description: "Please generate password then save & use",
                    placement: "bottom",
                });
            }
            return;
        }
        let isValid = await isAlreadySaved();

        if (isValid) {
            if (!Toast.isActive(30)) {
                Toast.show({
                    id: 30,
                    description: "This password already saved!",
                    placement: "bottom",
                });
            }
            return;
        }
        const user = appStore.currentUser;
        let userData = await getAsValue(`${user}`);
        userData = JSON.parse(userData)

        let { data } = userData;
        if (data) {
            saveData(data, true);
        } else {
            let freshData = JSON.parse(JSON.stringify(newPasswordList));
            saveData(freshData, false);
        }
        if (!Toast.isActive(21)) {
            Toast.show({
                id: 21,
                description: "your generated password has been saved in your cart . It will reflect on home screen",
                placement: "bottom",
            });
        }
    }
    const isAlreadySaved = async () => {
        const user = appStore.currentUser;
        let userData = await getAsValue(`${user}`);
        let { data } = JSON.parse(userData);
        let isSame = false;

        if (data) {
            let { Pririty, Entertainment, Study, Others, ECommerce, SocialMedia, Payment } = data;
            const currentData = {
                site: siteName,
                email: email,
                password: generated,
                length: value
            }

            let enteredType = [];
            let currType = getType(type);
            if (currType == 'Pririty') {
                enteredType = Pririty;
            } else if (currType == 'Entertainment') {
                enteredType = Entertainment;
            } else if (currType == 'Study') {
                enteredType = Study;
            } else if (currType == 'Others') {
                enteredType = Others;
            } else if (currType == 'ECommerce') {
                enteredType = ECommerce;
            } else if (currType == 'SocialMedia') {
                enteredType = SocialMedia;
            } else {
                enteredType = Payment;
            }
            enteredType.data.map((item, index) => {
                if (JSON.stringify(currentData) === JSON.stringify(item)) {
                    isSame = true;
                }
            })
        }

        return isSame;
    }
    const onPopupClose = () => {
        setVisible(false);
        setManualPassword('');
    }

    const onTextChanges = (value) => {
        setManualPassword(value);
        setGenerated(value);
    }

    const onAddManualClick = () => {
        checkSession();
        setVisible(true);
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' , justifyContent:'center' ,alignContent:'center'}}>
            <Header leftIcon={'backward'} leftClick={() => { onLeftIconClick() }} name="Create Password" isRight={false} isLeft={true} />
            <View style={style.container}>
                <View style={[style.inputBox, { marginTop: 20 }]}>
                    <TextInput originalColor="#9370db" placeholder="website or app name" value={siteName} onChangeText={(text: string) => { setSiteName(text) }} />
                </View>
                <View style={[style.inputBox, { marginTop: 20 }]}>
                    <TextInput originalColor="#9370db" placeholder="username or email id" value={email} onChangeText={(text: string) => { setEmail(text) }} />
                </View>
                <View style={style.line} />
                <View style={[style.inputBox, { marginTop: 40, flexDirection: 'row' }]}>
                    <TextInput originalColor="#9370db"  editable={false} placeholder="Generated Password" value={generated} onChangeText={(text: string) => { }} />
                    {/* {copyComponent()} */}
                </View>
                <View style={[style.line, { marginTop: 40 }]}>
                    <Slider
                        style={{ width: '100%' }}
                        minimumValue={3}
                        maximumValue={40}
                        thumbTintColor="blue"
                        maximumTrackTintColor="#9370db"
                        minimumTrackTintColor="#9370db"
                        step={1}
                        value={value}
                        onValueChange={handleValueChange}
                    />
                    <Text>Value of slider is : {value}</Text>
                </View>
                <View style={{ marginLeft: 15, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'gray', fontSize: 20 }}>
                        Length : {value}
                    </Text>
                    <DropdownComponent data={dropDownData} style={{ height: 40, width: 150, color: 'blue' }} name={'select type'} onChanged={onTypeSelect} />
                </View>
                <CustomPopup isVisible={isVisible} onClick={onPopupClose} value={manualyPassword} onTextChange={onTextChanges} placeholder={'Enter your password'}  name={'Add Password!'}/>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={style.CheckBoxStyle}>
                        <CheckBox
                            value={isNumber}
                            onValueChange={setNumber}
                            style={{ height: 30, width: 30 }}
                        />
                        <Text style={{ color: 'gray', fontSize: 20 }}>Number</Text>
                    </View>
                    <View style={[style.CheckBoxStyle, { marginRight: 20 }]}>
                        <CheckBox
                            value={isSpecial}
                            onValueChange={setSpecial}
                            style={{ height: 30, width: 30 }}
                        />
                        <Text style={{ color: 'gray', fontSize: 20 }}>Special Character</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={style.CheckBoxStyle}>
                        <CheckBox
                            value={isSmallAlphabet}
                            onValueChange={setSmallAphabet}
                            style={{ height: 30, width: 30 }}
                        />
                        <Text style={{ color: 'gray', fontSize: 20 }}>LowerCase</Text>
                    </View>
                    <View style={[style.CheckBoxStyle, { marginRight: 20 }]}>
                        <CheckBox
                            value={isLargeAlphabet}
                            onValueChange={setLargeAlphabet}
                            style={{ height: 30, width: 30 }}
                        />
                        <Text style={{ color: 'gray', fontSize: 20 }}>UpperCase</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                    <CustomButton
                        width={150}
                        height={45}
                        onClick={() => { onGenerate() }}
                        disabled={false}
                        myStyle={{ marginLeft: 10 }}
                        text={fisrt ? 'Generate' : 'Re-Generate'}
                    />
                    <CustomButton
                        width={150}
                        height={45}
                        onClick={() => { onSaveClick() }}
                        disabled={false}
                        myStyle={{ marginRight: 10, padding: 5 }}
                        text={'Save Password'}
                    />
                </View>
                <View style={{ marginTop: 30, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>OR</Text>
                </View>

                <View style={{ marginTop: 30, alignItems: 'center' }}>
                    <CustomButton
                        width={'100%'}
                        height={45}
                        onClick={() => { onAddManualClick() }}
                        disabled={false}
                        myStyle={{ marginLeft: 20, marginRight: 20 }}
                        text={'Add Manually'}
                    />
                </View>
                <ActivityIndicator animating={loader} size="large" color="#0000ff" />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
        justifyContent:'space-evenly' ,alignContent:'center',
        

    },
    inputBox: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    line: {
        height: 1,
        backgroundColor: '#D3D3D3',
        marginTop: 30,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    CheckBoxStyle: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10,
        alignItems: 'center'
    }
})

export default AddPasswordScreen;