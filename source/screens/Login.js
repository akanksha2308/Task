import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ListTypes} from '../store/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScene = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const setData = async () => {
      await AsyncStorage.setItem('list', JSON.stringify(ListTypes));
    };
    setData();
  }, []);

  const onLoginPress = async () => {
    if (!userName) {
      Alert.alert('Please fill username');
      return;
    }
    if (!password) {
      Alert.alert('Please fill password');
      return;
    }
    await AsyncStorage.setItem(
      'username and password',
      `${userName}&${password}`,
    );
    navigation.navigate('main');
  };

  return (
    <View style={styles.main}>
      <Image
        source={{
          uri: 'https://i.pcmag.com/imagery/reviews/04C2m2ye5UfXyb5x5WWIsZ4-7.1583940698.fit_lim.size_1050x591.jpg',
        }}
        style={styles.imageStyle}
      />
      <TextInput
        style={styles.userNameContainer}
        placeholder="Username"
        placeholderTextColor={'#0079bf'}
        underlineColorAndroid="transparent"
        returnKeyType={'done'}
        value={userName}
        onChangeText={text => setUserName(text)}
      />

      <TextInput
        style={styles.passwordContainer}
        underlineColorAndroid="transparent"
        placeholderTextColor={'#0079bf'}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.textStyle}>LOGIN</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0079bf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    width: 300,
    height: 48,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonContainer: {margin: 10, alignItems: 'center', justifyContent: 'center'},
  passwordContainer: {
    width: 300,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 15,
    marginVertical: 10,
  },
  userNameContainer: {
    width: 300,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 15,
    color: '#0079bf',
    marginVertical: 20,
  },
  imageStyle: {
    width: 120,
    height: 80,
    resizeMode: 'center',
    borderRadius: 80,
  },
  textStyle: {color: '#0079bf', fontSize: 18, fontWeight: 'bold'},
});

export default LoginScene;
