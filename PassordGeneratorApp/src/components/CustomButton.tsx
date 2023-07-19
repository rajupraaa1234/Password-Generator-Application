import React from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = (props: any) => {
    const {
        width,
        height,
        myStyle,
        text,
        onClick
    } = props;
    return (
        <TouchableOpacity style={[{ ...myStyle }, { width: width, height: height }, style.container]} onPress={() => { onClick() }}>
            <Text style={style.btnStyle}>{text}</Text>
        </TouchableOpacity>
    );
}

CustomButton.defaultProps = {
    width: 300,
    height: 40,
    text: 'click',
    onClick: () => { console.log('click') }
}

const style = StyleSheet.create({
    btnStyle: {
        color: 'black',
        fontSize: 20,
    },
    container: {
        backgroundColor: '#DED8F3',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }

});
export default CustomButton;

