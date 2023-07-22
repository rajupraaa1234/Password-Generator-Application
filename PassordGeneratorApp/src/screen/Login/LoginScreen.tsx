import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Tracker } from '@images';
import TextInput from "react-native-text-input-interactive";
import { CustomButton } from '@components';
import { STRING } from '@constant';
import { Toast } from "native-base";
import { setAsValue, getAsValue } from '@utils';

const LoginScreen = () => {
  const [page, setPage] = useState(0);    // 0 for Login , 1 for Signup
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');


  const login = async () => {
    if (username.length > 3 && password.length > 3) {
      const user = await getAsValue(username);
      if (user) {
        const pass = JSON.parse(user).password;
        if (pass !== password) {
          Toast.show({
            id: 11,
            description: "Invalid password, please enter valid password",
            placement: "bottom",
          });
        } else {
          await setAsValue("currentUser", username);
          Toast.show({
            id: 14,
            description: "Login successfully...",
            placement: "bottom",
          });
        }
      } else {
        if (!Toast.isActive(12)) {
          Toast.show({
            id: 12,
            description: "Inavalid user",
            placement: "bottom",
          });
        }
      }
    } else {
      if (!Toast.isActive(11)) {
        Toast.show({
          id: 11,
          description: "Invalid credential please enter valid userId & password",
          placement: "bottom",
        });
      }
    }
  }

  const signUp = async () => {
    if (username.length > 3 && password.length > 3) {
      const newUser = {
        user: username,
        password: password,
      };
      const user = await getAsValue(username);
      if (user) {
        if (!Toast.isActive(16)) {
          Toast.show({
            id: 16,
            description: "This user already registered, you can directly login...",
            placement: "bottom",
          });
        }
      } else {
        await setAsValue(username, JSON.stringify(newUser));
        if (!Toast.isActive(15)) {
          Toast.show({
            id: 15,
            description: "This user has been successfully register...",
            placement: "bottom",
          });
        }
      }
    } else {
      if (!Toast.isActive(13)) {
        Toast.show({
          id: 13,
          description: "please enter valid userId & password to signUp",
          placement: "bottom",
        });
      }
    }
  }

  const onSubmit = () => {
    if (page == 0) {
      login();
    } else {
      signUp();
    }
  }

  return (
    <ImageBackground source={Tracker} resizeMode="stretch" style={style.BackgroundStyle}>
      <View style={{ flex: 0.3, }} />
      <SafeAreaView style={style.container}>
        <ScrollView>
          <View>
            <View style={{ marginTop: 30, marginLeft: 5 }}>
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
                onClick={() => { onSubmit() }}
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
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

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