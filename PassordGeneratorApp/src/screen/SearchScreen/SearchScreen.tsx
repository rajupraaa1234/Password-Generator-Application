import React, { useContext, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, DropdownComponent } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '@mobx/hooks';
import { AuthContext } from '@context/auth-context';
import TextInput from "react-native-text-input-interactive";
import { useFocusEffect } from '@react-navigation/native';
import CardView from 'react-native-cardview'
import Clipboard from '@react-native-clipboard/clipboard';
import Icon1 from 'react-native-vector-icons/Feather';
import { EmptyFour } from '@images';
import { searchType, getAsValue, checkPasswordStrength, setAsValue, isExpire } from '@utils';
import Icon from 'react-native-vector-icons/AntDesign';





const SearchScreen = () => {
    const [value, setValue] = useState('');
    const [type, setType] = useState('');
    const { appStore } = useStore();
    const [data, setData] = useState([]);
    const [reset, setReset] = useState([]);
    const auth = useContext(AuthContext);
    const navigation = useNavigation();

    const onLeftIconClick = () => {
        auth.onProfileClick();
        navigation.navigate('ProfileScreen');
    }
    const onRightIconClick = () => {
        auth.onProfileClick();
        navigation.navigate('AddPasswordScreen');
    }

    const logout = async () => {
        appStore.setCurrentUser(null);
        await setAsValue("currentUser", '');
        await setAsValue('LastUpdatedTime', null);
        await setAsValue('isTrusted', "0");
        appStore.setTrustedDevice(false);
        await setAsValue("isTrusted", "false");
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


    const onTypeSelect = (item) => {
        checkSession();
        setType(item.label);
    }

    useFocusEffect(
        useCallback(() => {
            checkSession();
            fetchUserData();
        }, []),
    );


    const fetchUserData = async () => {
        const user = appStore.currentUser;
        let userData = await getAsValue(`${user}`);
        let { data } = JSON.parse(userData);
        if (data) {
            let { Pririty, Entertainment, Study, Others, ECommerce, SocialMedia, Payment } = data;
            data = [...Pririty.data, ...Entertainment.data, ...Study.data, ...Others.data, ...ECommerce.data, ...SocialMedia.data, ...Payment.data];
        }
        setData(data);
        setReset(data);
    }


    const resetData = () => {
        setData(reset);
    }


    const renderItem = (data: any) => {
        return (
            <CardView
                padding={10}
                marginBottom={15}
                cardElevation={5}
                borderRadius={10}
                cardMaxElevation={5}
                style={style.cardContainer}
                cornerRadius={8}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Icon name="amazon" size={40} color="white" />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>{data.site}</Text>
                            <Text style={{ color: 'white', fontSize: 15 }}>{data.email}</Text>
                            <Text style={{ color: 'white', fontSize: 10 }}>{data.password}</Text>

                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { copyToClipboard(data.password) }}>
                        <Icon1 name="copy" size={40} color="white" />
                    </TouchableOpacity>
                </View>

            </CardView>
        )
    }

    const copyToClipboard = (password: string) => {
        Clipboard.setString(password);
    }

    const renderEmptyView = () => {
        return (
            <View style={{ width: '95%', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
                <EmptyFour width={'100%'} height={220} />
            </View>
        );
    }


    const searchByPassword = (text) => {
        let newArr = reset.filter((item) => {
            if (`${item.password}`.toLowerCase().includes(`${text}`.toLowerCase())) {
                return item;
            }
        });
        setData(newArr);
    }
    const searchBySite = (text) => {
        let newArr = reset.filter((item) => {
            if (`${item.site}`.toLowerCase().includes(`${text}`.toLowerCase())) {
                return item;
            }
        });
        setData(newArr);
    }

    const searchByUserName = (text) => {
        let newArr = reset.filter((item) => {
            if (`${item.email}`.toLowerCase().includes(`${text}`.toLowerCase())) {
                return item;
            }
        });
        setData(newArr);
    }

    const searchBySafePass = (text) => {
        let newArr = reset.filter((item) => {
            let str = checkPasswordStrength(item.password);
            if ((str == 3 || str == 4) && `${item.password}`.toLowerCase().includes(`${text}`.toUpperCase())) return item;
        });
        setData(newArr);
    }
    const searchByWeakPass = (text) => {
        let newArr = reset.filter((item) => {
            let str = checkPasswordStrength(item.password);
            if ((str == 2) && `${item.password}`.toLowerCase().includes(`${text}`.toLowerCase())) return item;
        });
        setData(newArr);
    }

    const searchByRiskPass = (text) => {
        let newArr = reset.filter((item) => {
            let str = checkPasswordStrength(item.password);
            if ((str == 1) && `${item.password}`.toLowerCase().includes(`${text}`.toLowerCase())) return item;
        });
        setData(newArr);
    }


    const searchWithFilter = (text) => {
        switch (`${type}`) {
            case 'Password':
                searchByPassword(text);
                break;
            case 'Site Name':
                searchBySite(text);
                break;
            case 'Username':
                searchByUserName(text);
                break;
            case 'Safe Password':
                searchBySafePass(text);
                break;
            case 'Weak Password':
                searchByWeakPass(text);
                break;
            case 'Risk Password':
                searchByRiskPass(text);
                break;
        }
    }

    const onTextChanges = (text) => {
        setValue(text);
        if (text.length > 0 && type.length > 0) {
            searchWithFilter(text);
        } else {
            resetData();
        }
    }


    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Header name={'Search'} leftIcon="user" rightIcon="plus" leftClick={() => { onLeftIconClick() }} rightClick={() => { onRightIconClick() }} />
            <View style={{ marginTop: 10, marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <TextInput originalColor="#9370db" textInputStyle={{ width: 220 }} placeholder="Search..." value={value} onChangeText={onTextChanges} />
                </View>
                <DropdownComponent data={searchType} style={{ height: 50, width: 150, color: '#9370db', marginRight: 15 }} name={'select type'} onChanged={onTypeSelect} />
            </View>
            <View style={{ marginTop: 10, flex: 1, alignContent: 'center', justifyContent: 'center', marginHorizontal: 15 }}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    keyExtractor={(item, index) => `${index}`}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmptyView}
                />
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    cardContainer: {
        height: 100,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#7b68ee'
    }
});


export default SearchScreen;