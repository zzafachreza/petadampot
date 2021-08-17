import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {tan} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MyButton} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

export default function ListData({navigation}) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const ceklistData = (tipe, user) =>
    Alert.alert('Petadampot', 'CEKLIS ' + tipe + '?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const kirim = {
            tipe: tipe,
            nis: user,
          };
          console.log('kirim ke server', kirim);
          axios
            .post('https://zavalabs.com/petadampot/api/ceklis_add.php', kirim)
            .then(res => {
              getDataCeklist();
            });
        },
      },
    ]);

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    // console.log('list transaksi', obj.notification);
    getData('user').then(res => {
      setUser(res);
      // console.log(res);

      axios
        .post('https://zavalabs.com/petadampot/api/ceklis.php', {
          nis: res.nis,
        })
        .then(res => {
          // console.log(res.data);
          setData(res.data);
        });
    });
  });

  const getDataCeklist = () => {
    getData('user').then(res => {
      setUser(res);
      // console.log(res);

      axios
        .post('https://zavalabs.com/petadampot/api/ceklis.php', {
          nis: res.nis,
        })
        .then(res => {
          console.log(res.data);
          setData(res.data);
        });
    });
  };

  useEffect(() => {
    if (isFocused) {
      getDataCeklist();
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          padding: 10,
          flex: 1,
        }}>
        {data.map(item => {
          return (
            <View
              key={item.id}
              style={{
                margin: 5,
                borderRadius: 10,
                borderColor: colors.primary,
                borderWidth: 1,
                backgroundColor: colors.white,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1, padding: 10}}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 30,
                      color: colors.black,
                    }}>
                    Tanggal :{' '}
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                      }}>
                      {item.tanggal}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 30,
                      color: colors.black,
                    }}>
                    Pukul :{' '}
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                      }}>
                      {item.jam}
                    </Text>
                  </Text>

                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 30,
                      color: colors.tertiary,
                    }}>
                    {item.tipe}
                  </Text>
                </View>
                <View
                  style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="ionicon"
                    name="checkmark-circle"
                    color={colors.primary}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            padding: 10,
          }}>
          <MyButton
            onPress={() => ceklistData('MEMBERI PUPUK', user.nis)}
            Icons="leaf"
            title="PUPUK"
            warna={colors.tertiary}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 10,
          }}>
          <MyButton
            onPress={() => ceklistData('SIRAM TANAMAN', user.nis)}
            Icons="color-fill"
            title="SIRAM"
            warna={colors.primary}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
