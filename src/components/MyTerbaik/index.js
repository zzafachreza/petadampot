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

export default function MyTerbaik() {
  useEffect(() => {
    // axios.get('https://zavalabs.com/mylaundry/api/barang.php').then(res => {
    //   console.log(res.data);
    //   setData(res.data);
    //   // setData(res.data.data);
    // });
  }, []);

  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      id: '1',
      nama_barang: 'TANAMAN JAHE',
      foto: require('../../assets/jahe.png'),
      menu: 'Barang',
    },
    {
      id: '2',
      nama_barang: 'TANAMAN STRAWBERRY',
      foto: require('../../assets/strawberry.png'),
      menu: 'Barang',
    },
    {
      id: '3',
      nama_barang: 'TANAMAN PEPAYA',
      foto: require('../../assets/pepaya.png'),
      menu: 'Barang',
    },
  ]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(item.menu, {
            key: item.nama_barang,
          })
        }
        activeOpacity={1.0}>
        <Image style={styles.image} source={item.foto} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
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
            {item.nama_barang}
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
