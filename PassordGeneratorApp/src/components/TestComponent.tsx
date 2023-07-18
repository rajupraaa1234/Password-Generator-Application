import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useStore } from '@mobx/hooks';
import { API } from '@api';


const TestComponent = () => {
    const { appStore } = useStore;

  
    useEffect(() => {
        console.log('radjsbndjhfbsf');
    })
    return (
        <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column', alignContent: 'center', alignSelf: 'center' }}>
            <Text>This is Text Components...</Text>
            <Text>This is new Project ... {appStore.appName}</Text>
        </View>
    )
};


export default TestComponent;


