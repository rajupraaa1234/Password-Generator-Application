import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { STRING } from '@constant';

import {
    GeneratePassword,
    SecurePassword,
    StorePassword,
} from '@images';


const SlideComponent = (props: any) => {
    const {
        type,
    } = props;

    return (
        <View>
            {type === 0 ? <SecurePassword height={'80%'} /> : type === 1 ? <GeneratePassword height={'80%'} /> : <StorePassword height={'80%'} />}
            <View style={{ justifyContent: 'center', alignSelf: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 18, color: 'gray', fontWeight: '500', paddingHorizontal: 10, textAlign: 'center' }}>{type == 0 ? STRING.FIRST : type == 1 ? STRING.SECOND : STRING.THIRD}</Text>
            </View>
        </View>
    )

}


SlideComponent.defaultProps = {
    type: 0,
}
export default SlideComponent;
