import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Header, PieChartComponent } from '@components';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@context/auth-context';
import { useFocusEffect } from '@react-navigation/native';
import { getAllPasswordStrength } from '@utils';
import { useStore } from '@mobx/hooks';


const AnalyticScreen = () => {
    const auth = useContext(AuthContext);
    const navigation = useNavigation();
    const { appStore } = useStore();
    const [countObj, setCount] = useState({});
    const [data, setData] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, []),
    );

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

    const userPasswordListData = () =>{
        
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

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
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
            <View style={{marginTop : 20}}>

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
    }
})

export default AnalyticScreen;