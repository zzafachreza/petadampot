import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  PermissionsAndroid,
  Image,
  Animated,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {color} from 'react-native-reanimated';
import {getData} from '../../utils/localStorage';
import LottieView from 'lottie-react-native';

import Sound from 'react-native-sound';
import {MyHeader} from '../../components';

var whoosh = new Sound(
  require('../../assets/suara.mp3'),
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    alert('nyala suara');
    console.log(
      'duration in seconds: ' +
        whoosh.getDuration() +
        'number of channels: ' +
        whoosh.getNumberOfChannels(),
    );
  },
).play();

export default function Splash({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const scaleLogo = new Animated.Value(0);
  const scaleText = new Animated.Value(100);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Izinkan Untuk Download Report',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  Animated.timing(scaleLogo, {
    toValue: 1,
    duration: 1500,
  }).start();

  Animated.timing(scaleText, {
    toValue: 1,
    duration: 1000,
  }).start();

  useEffect(() => {
    requestCameraPermission();
    const unsubscribe = getData('user').then(res => {
      // console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('GetStarted');
        }, 1500);
      } else {
        console.log('sudah login logon');

        setTimeout(() => {
          navigation.replace('MainApp');
        }, 1500);
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // paddingBottom: windowHeight / 4,
        }}>
        <Animated.Image
          source={require('../../assets/logo.png')}
          style={{
            resizeMode: 'contain',
            aspectRatio: scaleLogo,
          }}
        />
        <Animated.View
          style={{
            top: scaleText,
          }}>
          <Text
            style={{
              marginTop: 10,
              fontFamily: fonts.primary[600],
              fontSize: windowWidth / 10,
              textAlign: 'center',
              maxWidth: windowWidth / 1.2,
              color: colors.primary,
            }}>
            PETADAMPOT
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontFamily: fonts.primary[600],
              fontSize: windowWidth / 21,
              textAlign: 'center',
              // maxWidth: windowWidth / 1.2,
              color: colors.tertiary,
            }}>
            perawatan tanaman dalam pot
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    width: 250,
    height: 250,
  },
});
