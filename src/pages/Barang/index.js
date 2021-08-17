import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import {MyButton, MyGap, MyInput} from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Modalize} from 'react-native-modalize';
import {showMessage} from 'react-native-flash-message';
import {getData} from '../../utils/localStorage';
import axios from 'axios';

export default function Barang({navigation, route}) {
  const item = route.params;

  const [kirim, setKirim] = useState({
    tanaman: item.tanaman,
    siram: item.siram,
    pupuk: item.pupuk,
  });

  let gambar = '';

  switch (item.tanaman) {
    case 'TANAMAN JAHE':
      gambar = require('../../assets/jahe.png');
      break;
    case 'TANAMAN STRAWBERRY':
      gambar = require('../../assets/strawberry.png');
      break;
    case 'TANAMAN PEPAYA':
      gambar = require('../../assets/pepaya.png');
      break;

    default:
      break;
  }

  navigation.setOptions({
    title: item.tanaman,
  });

  const [jumlah, setJumlah] = useState(parseInt(item.siram));
  const [jumlah2, setJumlah2] = useState(parseInt(item.pupuk));
  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user', res);
      setUser(res);
      setKirim({
        ...kirim,
        nis: res.nis,
      });
    });
  }, []);

  const addToCart = () => {
    console.log('kirim tok server', kirim);
    axios
      .post('https://zavalabs.com/petadampot/api/tanaman_update.php', kirim)
      .then(res => {
        console.log(res);
        showMessage({
          type: 'success',
          message: item.tanaman + 'Berhasil di Update',
        });
        navigation.goBack();
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <ScrollView style={{flex: 1}}>
        <Image
          resizeMode="cover"
          style={{
            // marginTop: (windowWidth / 5) * -1,
            width: '100%',
            aspectRatio: 1.5,
            alignSelf: 'center',
            // margin: 5,
          }}
          source={gambar}
        />
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 15,
              color: colors.black,
            }}>
            {item.tanaman}
          </Text>
        </View>
        <View style={{flex: 1, padding: 10}}>
          {/* siram */}
          <View>
            <View style={{flexDirection: 'row'}}>
              <Icon type="ionicon" name="color-fill" color={colors.primary} />
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 20,
                  color: colors.primary,
                  left: 10,
                }}>
                Siram Sehari Berapa Kali
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (jumlah <= 0) {
                    showMessage({
                      type: 'danger',
                      message: 'Masukan Minimal 1x',
                    });
                  } else {
                    setJumlah(jumlah - 1);
                    setKirim({
                      ...kirim,
                      siram: jumlah - 1,
                    });
                  }
                }}
                style={{
                  backgroundColor: colors.primary,
                  width: '40%',
                  borderRadius: 10,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <Icon type="ionicon" name="remove" color={colors.white} />
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '20%',
                }}>
                <Text style={{fontSize: 16, fontFamily: fonts.secondary[600]}}>
                  {jumlah} X
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (jumlah > 100) {
                    showMessage({
                      type: 'danger',
                      message: 'Masukan Maksimal 100x',
                    });
                  } else {
                    setJumlah(jumlah + 1);
                    setKirim({
                      ...kirim,
                      siram: jumlah + 1,
                    });
                  }
                }}
                style={{
                  backgroundColor: colors.primary,
                  width: '40%',
                  borderRadius: 10,
                  marginLeft: 10,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon type="ionicon" name="add" color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
          {/* Siram */}
          <MyGap jarak={10} />
          {/* pupuk */}
          <View>
            <View style={{flexDirection: 'row'}}>
              <Icon type="ionicon" name="server" color={colors.black} />
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 20,
                  color: colors.black,
                  left: 10,
                }}>
                Pupuk 2 Minggu Berapa kali
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (jumlah2 <= 0) {
                    showMessage({
                      type: 'danger',
                      message: 'Masukan Minimal 1x',
                    });
                  } else {
                    setJumlah2(jumlah2 - 1);
                    setKirim({
                      ...kirim,
                      pupuk: jumlah2 - 1,
                    });
                  }
                }}
                style={{
                  backgroundColor: colors.black,
                  width: '40%',
                  borderRadius: 10,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <Icon type="ionicon" name="remove" color={colors.white} />
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '20%',
                }}>
                <Text style={{fontSize: 16, fontFamily: fonts.secondary[600]}}>
                  {jumlah2} X
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (jumlah2 > 100) {
                    showMessage({
                      type: 'danger',
                      message: 'Masukan Maksimal 100x',
                    });
                  } else {
                    setJumlah2(jumlah2 + 1);
                    setKirim({
                      ...kirim,
                      pupuk: jumlah2 + 1,
                    });
                  }
                }}
                style={{
                  backgroundColor: colors.black,
                  width: '40%',
                  borderRadius: 10,
                  marginLeft: 10,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon type="ionicon" name="add" color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
          {/* pupuk */}
        </View>
      </ScrollView>

      <View>
        <MyButton
          fontWeight="bold"
          radius={0}
          title="SIMPAN PENGATURAN"
          warna={colors.tertiary}
          onPress={addToCart}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
