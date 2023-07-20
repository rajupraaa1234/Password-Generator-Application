import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import CustomCarousel from 'react-native-snap-carousel';
import { CustomButton, SlideComponent } from '@components';

const OnBoardingScreen = () => {
  const [type, setType] = useState(0);
  const reF = useRef();
  const [buttonName, setButtonName] = useState('Next');
  useEffect(() => {
    SplashScreen.hide();
  });
  let data = ["1", "2", "3"];
  const renderItem = ({ item, index }) => {
    return (
      <SlideComponent type={type} />
    )
  }
  const onClickNext = () => {
    reF.current.snapToNext();
  }

  return (
    <View style={{ flex: 1 }} >
      <View style={{ flex: 0.7 }}>
        <CustomCarousel
          accessible={true}
          testID="CarouselCustomCarousel"
          accessibilityLabel="CarouselCustomCarousel"
          ref={reF}
          data={data}
          renderItem={renderItem}
          sliderWidth={Dimensions.get('screen').width}
          itemWidth={Dimensions.get('screen').width}
          loop={true}
          autoplay={false}
          autoplayDelay={0}
          autoplayInterval={0}
          onSnapToItem={index => {
            setType(index);
            if (index === 2) {
              setButtonName("Continue");
            }else{
              setButtonName("Next");
            }
          }}
        />
      </View>
      <View style={style.subContainer}>
        <CustomButton
          width={Dimensions.get('screen').width - 80}
          height={45}
          onClick={() => { onClickNext() }}
          text={buttonName}
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
