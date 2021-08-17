import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {color} from 'react-native-elements/dist/helpers';
import {getData} from '../../utils/localStorage';
import {useIsFocused} from '@react-navigation/native';

export default function MyTerbaik() {
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();

  const getDataTanaman = () => {
    getData('user').then(res => {
      setUser(res);
      axios
        .post('https://zavalabs.com/petadampot/api/tanaman.php', {
          nis: res.nis,
        })
        .then(res2 => {
          console.log(res2.data);
          setData(res2.data);
          // setData(res.data.data);
        });
    });
  };

  useEffect(() => {
    if (isFocused) {
      getDataTanaman();
    }
  }, [isFocused]);

  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const renderItem = ({item}) => {
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

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Barang', item)}
        activeOpacity={1.0}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.primary,
          }}>
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
            }}>
            <Icon type="ionicon" name="color-fill" color={colors.white} />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: 14,
                // borderBottomLeftRadius: 20,
                // borderTopRightRadius: 20,
                color: colors.white,
                textAlign: 'center',
              }}>
              Siram {item.siram}x Sehari
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="server" color={colors.white} />

            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: 14,
                // borderBottomLeftRadius: 20,
                // borderTopRightRadius: 20,
                color: colors.white,
                textAlign: 'center',
              }}>
              Pupuk 2 minggu {item.pupuk}x
            </Text>
          </View>
        </View>
        <Image style={styles.image} source={gambar} />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 14,
              flex: 1,
              backgroundColor: colors.tertiary,
              paddingHorizontal: 10,
              paddingVertical: 10,
              // borderBottomLeftRadius: 20,
              // borderTopRightRadius: 20,
              color: colors.white,
              textAlign: 'center',
            }}>
            {item.tanaman}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  card: {
    shadowColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: -10,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5.32,

    elevation: 5,

    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 10,
    flex: 1,
  },
  detailsContainerButton: {
    paddingHorizontal: 5,
  },
  title: {
    marginBottom: 7,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 18,
    color: colors.black,
  },
  subTitle: {
    // flex: 1,
    // backgroundColor: 'red',
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
});
