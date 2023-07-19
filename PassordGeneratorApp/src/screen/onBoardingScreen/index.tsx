import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { CustomButton } from '@components';


const OnBoardingScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <View style={{ flex: 1 }} >
      <View style={{ flex: 0.7 }}>

      </View>
      <View style={style.subContainer}>
        <CustomButton
          width={Dimensions.get('screen').width - 80}
          height={45}
          onClick={() => { console.log(`from component`) }}
          text={"next"}
        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  subContainer: {
    flex: 0.3,
    backgroundColor: 'blue',
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 30,
  }
})
export default OnBoardingScreen;
