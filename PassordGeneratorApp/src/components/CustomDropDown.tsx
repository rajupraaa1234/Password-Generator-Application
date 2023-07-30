import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { dropDownData } from '@utils';


const DropdownComponent = (props: any) => {
    const {
        style,
        data,
        onChanged,
        name
    } = props;
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    // const data = data ||  dropDownData;

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }, { ...style }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }, { ...style }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? name : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    onChanged(item);
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
        </View>
    );
};

DropdownComponent.defaultProps = {
    data: [],
    name: 'select item'
}

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: '#9370db',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        left: 22,
        color: 'blue',
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});