
import React, { useState } from "react";
import {
    Button, SafeAreaView, StyleSheet, Modal,
    View, Dimensions
} from "react-native";
import { CustomButton  } from '@components';
import TextInput from "react-native-text-input-interactive";


const { width } = Dimensions.get("window");

export const CustomPopup = (props: any) => {
    const { isVisible, onClick, onTextChange } = props;

    const [inputValue, setInputValue] = useState("");
    const onTextChanges = (value: any) => {
        setInputValue(value);
        onTextChange(value);
    }

    return (

        <Modal animationType="slide"
            transparent visible={isVisible}
            presentationStyle="overFullScreen"
        >
            <View style={styles.viewWrapper}>
                <View style={styles.modalView}>
                    <TextInput  textInputStyle={{ width: '80%', marginLeft: 0 }} originalColor="#9370db" placeholder="enter your password" value={inputValue} onChangeText={onTextChanges} />
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
    onTextChange: () => { }
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
        height: 180,
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