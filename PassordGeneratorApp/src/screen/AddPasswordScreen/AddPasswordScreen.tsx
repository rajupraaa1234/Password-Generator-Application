import React, { useContext, useEffect, useState } from "react";
import { View, Text, BackHandler, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Header, CustomButton , DropdownComponent } from '@components';
import { useNavigation } from '@react-navigation/native';
import TextInput from "react-native-text-input-interactive";
import Icon1 from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import { AuthContext } from '@context/auth-context';
import { Toast } from "native-base";
import { generatePassword , dropDownData} from '@utils';
import Clipboard from '@react-native-clipboard/clipboard';
import Slider from "react-native-slider";


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
    const [type , setType] = useState('');



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
    const onTypeSelect = (item) =>{
        setType(item.label);
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
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
                    <TextInput originalColor="#9370db" textInputStyle={{ width: '90%', marginLeft: 0 }} editable={false} placeholder="Generated Password" value={generated} onChangeText={(text: string) => { }} />
                    {copyComponent()}
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
                <View style={{ marginLeft: 15, marginTop: 20 ,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{ color: 'gray', fontSize: 20 }}>
                        Length : {value}
                    </Text>
                    <DropdownComponent data={dropDownData} style={{height : 40,width : 150 , color:'blue'}} name={'select type'} onChanged={onTypeSelect}/>
                </View>
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
                        onClick={() => { }}
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
                        onClick={() => { }}
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
        marginHorizontal: 10
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