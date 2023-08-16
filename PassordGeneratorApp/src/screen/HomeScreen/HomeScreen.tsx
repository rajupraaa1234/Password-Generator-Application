import React, { useContext, useEffect, useCallback, useState } from "react";
import { View, Text, SectionList, SafeAreaView, Dimensions, ActivityIndicator, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { emptyPasswordData, getAsValue, isExpire, setAsValue } from '@utils';
import { Header, CustomPopup } from '@components';
import { EmptyFour } from '@images';
import CardView from 'react-native-cardview'
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Toast } from "native-base";
import ShareIcon from 'react-native-vector-icons/FontAwesome';
import { useStore } from '@mobx/hooks';
import { AuthContext } from '@context/auth-context';


const HomeScreen = () => {
  const auth = useContext(AuthContext);
  const { appStore } = useStore();
  const [copiedText, setCopiedText] = useState('');
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);
  const [Mypassword, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [shareData, setShareData] = useState({});
  const [buttonSelect, setButtonSelect] = useState(0);     // 0 for copy // 1 for share
  const [listData, setListData] = useState(emptyPasswordData);

  const onStart = () => {
    setLoader(true);
  }

  const onEnd = () => {
    setLoader(false);
  }

  const showLoader = () => {
    onStart();
    setTimeout(() => {
      onEnd();
    }, 700);
  }

  useFocusEffect(
    useCallback(() => {
      checkSession();
      showLoader();
      setTimeout(() => {
        fetchUserData();
      }, 300);
    }, []),
  );


  useEffect(() => {
    appStore.setSkipped(true);
    showLoader();
    setTimeout(() => {
      fetchUserData();
    }, 300);

  }, []);

  const fetchUserData = async () => {
    const user = appStore.currentUser;
    let userData = await getAsValue(`${user}`);
    let { data } = JSON.parse(userData);

    if (data) {
      let { Pririty, Entertainment, Study, Others, ECommerce, SocialMedia, Payment } = data;
      let freshData = JSON.parse(JSON.stringify(emptyPasswordData));
      freshData[0].data = Pririty.data;
      freshData[1].data = Entertainment.data;
      freshData[2].data = Study.data;
      freshData[3].data = SocialMedia.data;
      freshData[4].data = ECommerce.data;
      freshData[5].data = Payment.data;
      freshData[6].data = Others.data;
      setListData(freshData);
    } else {
      setListData(emptyPasswordData)
    }
  }

  const copyToClipboard = (item) => {
    setVisible(true);
    setShareData(item);
    setButtonSelect(0);
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  const onTextChanges = (value) => {
    setPassword(value);
  }


  const onPopupClose = async () => {
    setVisible(false);
    setPassword('');
    if (Mypassword.length > 0) {
      const currUser = appStore.currentUser;
      const userData = await getAsValue(currUser);
      const { password } = JSON.parse(userData);
      if (password != Mypassword) {
        if (!Toast.isActive(30)) {
          Toast.show({
            id: 30,
            description: "Password Incorrect !",
            placement: "bottom",
          });
        }
      } else {
        if (buttonSelect == 0) {
          Clipboard.setString(shareData.password);
        } else {
          sharePassword(shareData);
        }
      }
    }
  }

  const sharePassword = async (item) => {
    const user = appStore.currentUser;
    let shareData = `Hi ${user} \nI am sharing your ${item.site} strong credentials with you from PasswordGenerator App please be carefull ❗ for your credential while sharing. \nUsername : ${item.email} \nPassword : ${item.password}`
    const option = {
      subject: '',
      dialogTitle: '',
    };
    const content = {
      title: 'App link',
      message: shareData,
    };
    try {
      await Share.share(content, option);
    } catch (error) { console.log(error) }
  }


  const onShareClick = async (item) => {
    setVisible(true);
    setShareData(item);
    setButtonSelect(1);
  }
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'column', alignContent: 'center' }}>
            <Icon1 name="security" color="white" size={30} />
            <Text style={{ color: 'white', fontSize: 10 }}>{data.item.site}</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', alignContent: 'center', height: '100%' }}>
              <Text style={{ color: 'white', fontSize: 15 }}>{data.item.email}</Text>
              <Text style={{ color: 'white', fontSize: 15 }}>{data.item.password}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', height: '100%', justifyContent: 'center', alignSelf: 'center', alignContent: 'center' }}>
            <TouchableOpacity onPress={() => { copyToClipboard(data.item) }}>
              <Icon name="copy" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { onShareClick(data.item) }} style={{ marginTop: 10 }}>
              <ShareIcon name="share" size={30} color="white" />
            </TouchableOpacity>
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

  const logout = async () => {
    appStore.setCurrentUser(null);
    await setAsValue("currentUser", '');
    await setAsValue('LastUpdatedTime', '');
    await setAsValue('isTrusted', "0");
    await setAsValue("isTrusted", "false");
    appStore.setTrustedDevice(false);
    auth.logout();
  }

  const checkSession = async () => {
    if (!appStore.isTrustedDevice) {
      const isTimeOut = await isExpire();
      if (isTimeOut) {
        setTimeout(() => {
          logout();
        }, 200)
      }
    }
  }

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
        <Header name={'Password'} leftIcon="user" rightIcon="plus" leftClick={() => { onLeftIconClick() }} rightClick={() => { onRightIconClick() }} />
        {loader && <ActivityIndicator animating={loader} size="large" color="#0000ff" />}
        <CustomPopup isVisible={isVisible} onClick={onPopupClose} value={Mypassword} onTextChange={onTextChanges} placeholder={'Enter your password'} name={'Verify , Enter your password to share/copy'} />
        <View style={{ marginHorizontal: 10, marginBottom: 170 }}>
          <SectionList
            sections={listData}
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