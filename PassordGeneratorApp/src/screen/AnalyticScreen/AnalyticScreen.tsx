import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Header, PieChartComponent } from '@components';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@context/auth-context';
import { EmptyFour } from '@images';
import { useFocusEffect } from '@react-navigation/native';
import { getAllPasswordStrength, getAllPasswordList, checkPasswordStrength, setAsValue, isExpire } from '@utils';
import { useStore } from '@mobx/hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';



const AnalyticScreen = () => {
    const auth = useContext(AuthContext);
    const navigation = useNavigation();
    const { appStore } = useStore();
    const [countObj, setCount] = useState({});
    const [data, setData] = useState([]);
    const [passwordData, setPasswordData] = useState([]);
    const [order, setOrder] = useState(1);   // 1 for inc   // 2 for Dec
    const [rotate, setRotate] = useState('0deg');


    useFocusEffect(
        useCallback(() => {
            checkSession();
            userPasswordListData();
            fetchData();
            onFilterClick();
        }, []),
    );


    const logout = async () => {
        appStore.setCurrentUser(null);
        await setAsValue("currentUser", '');
        await setAsValue('LastUpdatedTime', null);
        await setAsValue('isTrusted', "0");
        await setAsValue("isTrusted", "false");
        appStore.setTrustedDevice(false);
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

    const fetchData = async () => {
        let obj = await getAllPasswordStrength(appStore);
        setCount(obj);
        let flag = false;
        if (obj?.safe == 0 && obj?.risk == 0 && obj?.weak == 0) {
            flag = true;
        }
        const userData = [
            {
                name: "Safe",
                population: flag ? 1 : obj?.safe,
                color: "#65D16D",
            },
            {
                name: "Weak",
                population: obj?.risk,
                color: "#F00",
            },
            {
                name: "Risk",
                population: obj?.weak,
                color: "#EC9D3F",
            }
        ]
        setData(userData);
    }

    const userPasswordListData = async () => {
        const data = await getAllPasswordList(appStore);
        setPasswordData(data);
    }



    const renderItem = (item, index) => {
        const PassStrength = checkPasswordStrength(item.password);
        const color = PassStrength == 2 ? '#EC9D3F' : PassStrength == 1 ? '#F00' : '#65D16D';
        const name = PassStrength == 2 ? 'Weak' : PassStrength == 1 ? 'Risk' : 'Safe';
        return (
            <View style={[style.cardContainer, { borderColor: color }, index == passwordData.length - 1 ? { marginBottom: 90 } : { marginBottom: 0 }]}>
                <View style={{ position: 'absolute', left: 0, marginLeft: 10 }}>
                    <Icon1 name="security" color="black" size={30} />
                    <Text>{name}</Text>
                </View>
                <View style={{ position: 'absolute' }}>
                    <Text style={{ fontSize: 20 }}>{item.site}</Text>
                    <Text style={{ fontSize: 15 }}>{item.email}</Text>
                    <Text style={{ fontSize: 10 }}>{item.password}</Text>
                </View>
                <View style={{ right: 0, position: 'absolute', marginRight: 10 }}>
                    <Icon2 name="right" color="gray" size={25} />
                </View>
            </View>
        )
    }


    const onLeftIconClick = () => {
        auth.onProfileClick();
        navigation.navigate('ProfileScreen');
    }

    const getType = (value, text) => {
        return (
            <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ fontSize: 25 }}>{value}</Text>
                <Text style={{ fontSize: 20 }}>{text}</Text>
            </View>
        )
    }

    const onRightIconClick = () => {
        auth.onProfileClick();
        navigation.navigate('AddPasswordScreen');
    }

    const renderEmptyView = () => {
        return (
            <View style={{ width: '95%', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
                <EmptyFour width={'100%'} height={220} />
            </View>
        );

    }

    const onFilterClick = () => {
        checkSession();
        let risk = [];
        let safe = [];
        let weak = [];
        passwordData.map((item) => {
            let str = checkPasswordStrength(item.password);
            if (str == 1) {
                risk.push(item);
            } else if (str == 2) {
                weak.push(item);
            } else {
                safe.push(item);
            }
        });
        if (order == 1) {
            setPasswordData([...safe, ...weak, ...risk]);
            setRotate('0deg');
        } else {
            setPasswordData([...risk, ...weak, ...safe]);
            setRotate('180deg');
        }
        setOrder(2 / order);
    }

    return (
        <View style={{ flexDirection: 'column' }}>
            <Header name={'Security'} leftIcon="user" rightIcon="plus" leftClick={() => { onLeftIconClick() }} rightClick={() => { onRightIconClick() }} />
            <PieChartComponent data={data} />
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly' }}>
                <View style={[style.boxContainer, { borderColor: '#65D16D' }]}>
                    {getType(countObj?.safe, 'Safe')}
                </View>
                <View style={[style.boxContainer, { borderColor: '#EC9D3F' }]}>
                    {getType(countObj?.weak, 'Weak')}
                </View>
                <View style={[style.boxContainer, { borderColor: '#F00' }]}>
                    {getType(countObj?.risk, 'Risk')}
                </View>
            </View>
            <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 45 }}>
                <Text style={{ fontSize: 20 }}>Analysis</Text>
                <TouchableOpacity onPress={onFilterClick}>
                    <Icon style={{ transform: [{ rotate: rotate }] }} name="filter-outline" color={'black'} size={30} />
                </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 30, marginTop: 15, justifyContent: 'center', alignContent: 'center', height: 400 }}>
                <FlatList
                    data={passwordData}
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
    boxContainer: {
        borderRadius: 10,
        borderColor: 'gray',
        height: 80,
        width: 80,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardContainer: {
        height: 80,
        width: '95%',
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
        margin: 10,

    }

});


export default AnalyticScreen;