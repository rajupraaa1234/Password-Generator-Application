import React, { useContext } from "react";
import { View, Text } from 'react-native';
import { Header } from '@components';
import { setAsValue, isExpire } from '@utils';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@context/auth-context';
import { useStore } from '@mobx/hooks';



const SettingScreen = () => {

  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const { appStore } = useStore();


  const onLeftIconClick = () => {
    auth.onProfileClick();
    navigation.navigate('ProfileScreen');
  }


  const logout = async () => {
    appStore.setCurrentUser(null);
    await setAsValue("currentUser", '');
    await setAsValue('LastUpdatedTime', null);
    await setAsValue('isTrusted', "0");
    appStore.setTrustedDevice(false);
    await setAsValue("isTrusted", "false");
    auth.logout();
  }

  const checkSession = async () => {
    if (!appStore.isTrustedDevice) {
      const isTimeOut = await isExpire();
      if (isTimeOut) {
        logout();
      }
    }
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Header name={'Setting'} leftIcon="user" rightIcon="plus" leftClick={() => { onLeftIconClick() }} rightClick={() => { console.log(`right`) }} />
      <Text>SettingScreen</Text>
    </View>
  )
}

export default SettingScreen;