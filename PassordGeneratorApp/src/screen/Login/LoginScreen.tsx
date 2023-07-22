import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Tracker } from '@images';
import TextInput from "react-native-text-input-interactive";
import { CustomButton } from '@components';
import { STRING } from '@constant';

const LoginScreen = () => {
  const [page, setPage] = useState(0);    // 0 for Login , 1 for Signup
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground source={Tracker} resizeMode="stretch" style={style.BackgroundStyle}>
      <View style={{ flex: 0.3, }} />
      <SafeAreaView style={style.container}>
        <ScrollView>
          <View >
            <View style={{ marginTop: 10 }}>
              <Text style={style.loginText}>{page == 0 ? 'Login' : 'SignUp'}</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <TextInput placeholder="username" value={username} onChangeText={(text: string) => { setUserName(text) }} />
            </View>
            <View style={{ marginTop: 30 }}>
              <TextInput placeholder="password" value={password} onChangeText={(text: string) => { setPassword(text) }} />
            </View>

            <View style={{ marginTop: 60 }}>
              <CustomButton
                width={Dimensions.get('screen').width - 38}
                height={45}
                onClick={() => {

                }}
                text={page == 0 ? 'Login' : 'SignUp'}
              />
            </View>
            <TouchableOpacity style={{ marginTop: 10, marginLeft: 5 }} onPress={() => {
              if (page === 0) {
                setPage(1);
              } else {
                setPage(0);
              }
              setUserName('');
              setPassword('');
            }}>
              <Text style={{ color: 'blue' }}>{page == 0 ? "Don't have an account ?" : 'Do you have an account ?'}</Text>
            </TouchableOpacity>



          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={{ position: 'absolute', bottom: 0, marginBottom: 50, justifyContent: 'center', alignSelf: 'center' }}>
        <Text style={{ textAlign: 'center', color: 'gray' }}>
          {STRING.SECOND}
        </Text>
      </View>
    </ImageBackground>
  )
};

const style = StyleSheet.create({
  container: {
    flex: 0.7,
    borderTopLeftRadius: 30,
    flexDirection: 'column',
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    flexWrap: 'wrap',
    padding: 30,
  },
  BackgroundStyle: {
    height: '33%',
    width: '100%',
    flex: 1,
    backgroundColor: 'blue',
  },
  loginText: {
    fontSize: 25,
    fontWeight: '500',
    color: 'gray'
  },
  instruction: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  }
})
export default LoginScreen;