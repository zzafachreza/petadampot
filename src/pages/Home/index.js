import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {getData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyNews from '../../components/MyNews';
import MyKategori from '../../components/MyKategori';
import axios from 'axios';
import MyCarouser2 from '../../components/MyCarouser2';
import {MyButton, MyGap, MyTerbaik, MyHeader} from '../../components';
import Carousel from 'react-native-snap-carousel';

export default function Home({navigation}) {
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const Today = new Date();
  const hari = String(days[Today.getDay()]);
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(monthNames[Today.getMonth()]); //January is 0!
  const yyyy = Today.getFullYear();
  const jam = Today.getHours();
  const menit = Today.getMinutes();
  const detik = Today.getUTCSeconds();
  const today = `${hari}, ${dd} ${mm} ${yyyy}`;

  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
      setUser(res);
      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
      });
    });
    axios
      .post('https://zavalabs.com/mylaundry/api/update_token.php', {
        id_member: user.id,
        token: token,
      })
      .then(res => {
        console.log('update token', res);
      });
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };
  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={{
        flex: 1,
      }}>
      <MyHeader />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: fonts.primary[400],
                fontSize: windowWidth / 25,
              }}>
              Selamat Datang,
            </Text>
            <Text
              style={{
                fontFamily: fonts.primary[600],
                fontSize: windowWidth / 20,
              }}>
              {user.nama_lengkap}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                color={colors.tertiary}
                type="ionicon"
                name="calendar-outline"
              />
              <Text
                style={{
                  fontFamily: fonts.primary[600],
                  fontSize: windowWidth / 30,
                  left: 5,
                  color: colors.primary,
                }}>
                {today}
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Image
              style={{
                width: 48,
                height: 80,
              }}
              source={require('../../assets/logo.png')}
            />
          </View>
        </View>

        <View>
          <MyCarouser />
        </View>
        <MyGap jarak={10} />
        <View style={{padding: 10}}>
          <MyTerbaik />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
