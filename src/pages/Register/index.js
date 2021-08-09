import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Switch,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';

export default function Register({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    nama_lengkap: null,
    username: null,
    email: null,
    password: null,
    telepon: null,
    alamat: null,
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const simpan = () => {
    setLoading(true);
    console.log(data);
    axios
      .post('https://zavalabs.com/petadampot/api/register.php', data)
      .then(res => {
        console.log(res);
        let err = res.data.split('#');

        // console.log(err[0]);
        if (err[0] == 50) {
          setTimeout(() => {
            setLoading(false);
            showMessage({
              message: err[1],
              type: 'danger',
            });
          }, 1200);
        } else {
          setTimeout(() => {
            navigation.replace('Success', {
              messege: res.data,
            });
          }, 1200);
        }
      });
  };
  return (
    <ImageBackground
      style={{
        backgroundColor: isEnabled ? colors.black : colors.white,
        flex: 1,
        padding: 10,
      }}>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        {/* <Image
        source={require('../../assets/logooren.png')}
        style={styles.image}
      /> */}
        <Switch
          trackColor={{false: colors.border, true: colors.secondary}}
          thumbColor={isEnabled ? colors.primary : colors.border}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text
          style={{
            marginTop: 20,
            fontFamily: fonts.secondary[400],
            fontSize: 16,
            color: isEnabled ? colors.white : colors.black,
            // maxWidth: 230,
          }}>
          Silahkan melakukan pendaftaran terlebih dahulu, sebelum login ke
          Aplikasi
        </Text>

        <MyGap jarak={20} />
        <MyInput
          styleInput={{
            color: isEnabled ? colors.white : colors.black,
          }}
          label="Nama Lengkap"
          iconname="person-outline"
          value={data.nama_lengkap}
          onChangeText={value =>
            setData({
              ...data,
              nama_lengkap: value,
            })
          }
        />
        <MyGap jarak={5} />
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
        <MyGap jarak={5} />
        <MyInput
          styleInput={{
            color: isEnabled ? colors.white : colors.black,
          }}
          label="Email"
          iconname="mail-outline"
          value={data.email}
          onChangeText={value =>
            setData({
              ...data,
              email: value,
            })
          }
        />
        <MyGap jarak={5} />
        <MyInput
          styleInput={{
            color: isEnabled ? colors.white : colors.black,
          }}
          label="Alamat"
          iconname="map-outline"
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />

        <MyGap jarak={5} />
        <MyInput
          styleInput={{
            color: isEnabled ? colors.white : colors.black,
          }}
          label="Telepon"
          iconname="call-outline"
          value={data.telepon}
          onChangeText={value =>
            setData({
              ...data,
              telepon: value,
            })
          }
        />

        <MyGap jarak={5} />
        <MyInput
          styleInput={{
            color: isEnabled ? colors.white : colors.black,
          }}
          label="Password"
          iconname="key-outline"
          secureTextEntry
          value={data.password}
          onChangeText={value =>
            setData({
              ...data,
              password: value,
            })
          }
        />
        <MyGap jarak={20} />
        <MyButton
          warna={colors.primary}
          title="REGISTER"
          Icons="log-in"
          onPress={simpan}
        />
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
