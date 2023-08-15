
import React, { useState } from "react";
import {
    Text, StyleSheet, Modal,
    View, Dimensions
} from "react-native";
import { CustomButton  } from '@components';
import TextInput from "react-native-text-input-interactive";


const { width } = Dimensions.get("window");

export const CustomPopup = (props: any) => {
    const { isVisible, onClick, onTextChange , myStyle , children , placeholder , name , value} = props;

    const onTextChanges = (value: any) => {
        onTextChange(value);
    }

    return (

        <Modal animationType="slide"
            transparent visible={isVisible}
            presentationStyle="overFullScreen"
        >
            <View style={styles.viewWrapper}>
                <View style={[styles.modalView,{...myStyle}]}>
                    <Text style={{fontSize:20,padding:5,alignSelf:'center',justifyContent:'center',marginBottom:10}}>{name}</Text>
                    <TextInput  textInputStyle={{ width: '80%', marginLeft: 0 }} originalColor="#9370db" placeholder={placeholder} value={value} onChangeText={onTextChanges} />
                    {children}
                    <View style={{marginTop:10}}>
                        <CustomButton
                            width={150}
                            height={45}
                            onClick={onClick }
                            disabled={false}
                            myStyle={{ marginRight: 10, padding: 5  }}
                            text={'Done'}
                        />
                    </View>    
                </View>
            </View>
        </Modal>
    );
}

CustomPopup.defaultProps = {
    isVisible: false,
    onClick: () => { },
    placeholder : 'enter your password',
    onTextChange: () => { },
    name : 'Reset Password'
}




const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 200,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: 123,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
    },
});