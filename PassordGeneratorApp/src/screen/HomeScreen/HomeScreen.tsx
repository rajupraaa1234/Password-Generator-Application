import React, { useContext, useEffect } from "react";
import { View, Text, SectionList, SafeAreaView, Dimensions, Image, StyleSheet } from 'react-native';
import { emptyPasswordData } from '@utils';
import { Header } from '@components';
import { EmptyFour } from '@images';
import CardView from 'react-native-cardview'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import { useStore } from '@mobx/hooks';
import { AuthContext } from '@context/auth-context';


const HomeScreen = () => {
  const auth = useContext(AuthContext);
  const { appStore } = useStore();
  const navigation = useNavigation();
  const DATA = [
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Desserts',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
  ];

  useEffect(() => {
    appStore.setSkipped(true);
  }, []);
  const renderItem = (data: any) => {
    return (
      <CardView
        padding={10}
        marginBottom={15}
        cardElevation={5}
        borderRadius={10}
        cardMaxElevation={5}
        style={style.cardContainer}
        cornerRadius={8}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View>
            <Icon name="amazon" size={40} color="white" />
          </View>
          <View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: 'white', fontSize: 15 }}>rajupraaa1234@gmail.com</Text>
              <Text style={{ color: 'white', fontSize: 15 }}>Raju@7272</Text>
            </View>
          </View>
          <View>
            <Icon1 name="copy" size={40} color="white" />
          </View>
        </View>

      </CardView>
    )
  }

  const renderSectionHeader = (title, data) => {
    if (data.length > 0) {
      return (
        <Text style={{ fontSize: 32, padding: 5 }}>{title}</Text>
      )
    } else {
      return (
        <View style={{ width: Dimensions.get('screen').width - 20, justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{ fontSize: 32, padding: 5 }}>{title}</Text>
          <EmptyFour width={'100%'} height={180} />
        </View>
      );
    }

  };

  const onLeftIconClick = () => {
    auth.onProfileClick();
    navigation.navigate('ProfileScreen');
  }

  const onRightIconClick = () => {
    auth.onProfileClick();
    navigation.navigate('AddPasswordScreen');
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        <Header name={'Password'} leftIcon="user" rightIcon="plus" leftClick={() => { onLeftIconClick() }} rightClick={() => {onRightIconClick()}} />
        <View style={{ marginHorizontal: 10, marginBottom: 170 }}>
          <SectionList
            sections={emptyPasswordData}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            stickyHeaderHiddenOnScroll={false}
            showsVerticalScrollIndicator={false}
            renderSectionHeader={({ section: { title, data } }) =>
              renderSectionHeader(title, data)
            }
          />
        </View>

      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  cardContainer: {
    height: 100,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#7b68ee'
  }
})

export default HomeScreen;