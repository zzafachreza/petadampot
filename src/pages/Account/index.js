import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {
  Avatar,
  Accessory,
  Divider,
  ListItem,
  // Icon,
  Button,
  Icon,
} from 'react-native-elements';
import {storeData, getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';

export default function Account({navigation}) {
  const [user, setUser] = useState({});
  const [iLogo, setiLogo] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      // console.log(user);
      setiLogo(res.nama_lengkap.substring(0, 1));
    });
  }, []);

  const handleSave = () => {
    storeData('user', null);

    navigation.replace('GetStarted');
  };

  return (
    <ImageBackground
      // source={require('../../assets/back.jpeg')}
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <View
        style={{
          padding: 10,
          // backgroundColor: 'green',
          flex: 1,
        }}>
        <View
          style={{
            marginVertical: 5,
            padding: 10,
            borderRadius: 10,
            backgroundColor: colors.white,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
            }}>
            Nama Lengkap
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              color: colors.black,
            }}>
            {user.nama_lengkap}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 5,
            padding: 10,
            backgroundColor: colors.white,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
            }}>
            Nomor Induk
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
            }}>
            {user.nis}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 5,
            padding: 10,
            borderRadius: 10,
            backgroundColor: colors.white,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
            }}>
            Kelas
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
            }}>
            {user.kelas}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 5,
            padding: 10,
            borderRadius: 10,
            backgroundColor: colors.white,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
            }}>
            Sekolah
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
            }}>
            {user.sekolah}
          </Text>
        </View>
        <MyGap jarak={20} />
        <MyButton
          onPress={handleSave}
          title="SIGN OUT"
          warna={colors.primary}
          Icons="log-out-outline"
        />
        <MyGap jarak={20} />
        <View style={{backgroundColor: colors.white, padding: 10}}>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Icon type="ionicon" name="bulb-outline" />
            <Text
              style={{
                left: 10,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.black,
              }}>
              Kartika Yuni Purwanti
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Icon type="ionicon" name="bulb-outline" />
            <Text
              style={{
                left: 10,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.black,
              }}>
              Suamanda Ika Novichasari
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Icon type="ionicon" name="bulb-outline" />
            <Text
              style={{
                left: 10,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.black,
              }}>
              Zulmi Roestika Rini
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Icon type="ionicon" name="bulb-outline" />
            <Text
              style={{
                left: 10,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.black,
              }}>
              Maya Mustafidah
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Icon type="ionicon" name="bulb-outline" />
            <Text
              style={{
                left: 10,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.black,
              }}>
              Yana Tri Anisyah Wardani
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
