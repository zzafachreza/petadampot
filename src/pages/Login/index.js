import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  Switch,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {storeData, getData} from '../../utils/localStorage';
import {showMessage} from 'react-native-flash-message';

export default function Login({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [data, setData] = useState({
    username: null,
    password: null,
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    getData('token').then(res => {
      console.log('data token,', res);
      setToken(res.token);
    });
  }, []);

  // login ok
  const masuk = () => {
    setLoading(true);
    console.log(data);
    setTimeout(() => {
      axios
        .post('https://zavalabs.com/petadampot/api/login.php', data)
        .then(res => {
          console.log(res.data);
          setLoading(false);
          if (res.data.kode == 50) {
            showMessage({
              type: 'danger',
              message: res.data.msg,
            });
          } else {
            storeData('user', res.data);
            axios
              .post('https://zavalabs.com/petadampot/api/update_token.php', {
                id_member: res.data.id,
                token: token,
              })
              .then(res => {
                console.log('update token', res);
              });

            navigation.replace('MainApp');
          }
        });
    }, 1200);
  };

  return (
    <ImageBackground
      style={{
        backgroundColor: isEnabled ? colors.black : colors.white,
        flex: 1,
        padding: 10,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: colors.white,
            borderRadius: 10,
          }}>
          <Switch
            trackColor={{false: colors.border, true: colors.secondary}}
            thumbColor={isEnabled ? colors.primary : colors.border}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: isEnabled ? colors.white : colors.black,
            }}>
            {isEnabled ? 'Dark Mode' : ''}
          </Text>
          <Image
            style={{width: 150, height: 150, resizeMode: 'contain'}}
            source={require('../../assets/logo.png')}
          />
        </View>
        <View
          style={{
            backgroundColor: isEnabled ? colors.black : colors.white,
            flex: 1,
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 20,
              color: isEnabled ? colors.white : colors.black,
              // maxWidth: 230,
            }}>
            Silahkan login untuk masuk ke aplikasi{' '}
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.black,
                // maxWidth: 230,
              }}>
              Petadampot
            </Text>
          </Text>

          <MyGap jarak={20} />
          <MyInput
            styleInput={{
              color: isEnabled ? colors.white : colors.black,
            }}
            label="username"
            iconname="card-outline"
            value={data.username}
            onChangeText={value =>
              setData({
                ...data,
                username: value,
              })
            }
          />
          <MyGap jarak={20} />
          <MyInput
            styleInput={{
              color: isEnabled ? colors.white : colors.black,
            }}
            label="Password"
            iconname="key-outline"
            secureTextEntry
            onChangeText={value =>
              setData({
                ...data,
                password: value,
              })
            }
          />
          <MyGap jarak={40} />
          <MyButton
            warna={colors.primary}
            title="LOGIN"
            Icons="log-in"
            onPress={masuk}
          />
        </View>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 10,
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
