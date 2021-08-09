import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../utils/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';

export default function MyCarouser() {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  useEffect(() => {
    // axios.get('https://zavalabs.com/sebatiku/api/slider.php').then(res => {
    //   setData(res.data);
    // });
  }, []);

  const [data, setData] = useState([
    {
      image: {
        uri: 'https://images.unsplash.com/photo-1534754789238-6250d515412f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80',
      },
    },
    {
      image: {
        uri: 'https://images.unsplash.com/photo-1517204452548-5f07ce910c9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      },
    },
    {
      image: {
        uri: 'https://images.unsplash.com/photo-1601985705201-2543f41a3ce6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      },
    },
  ]);

  const _renderItem = ({item, index}) => {
    return (
      <TouchableNativeFeedback>
        <ImageBackground
          key={item.id}
          // resizeMode="contain"
          source={item.image}
          style={{
            height: Math.round((windowWidth * 9) / 16),
          }}
        />
      </TouchableNativeFeedback>
    );
  };

  return (
    <Carousel
      // layout="stack"
      layoutCardOffset={18}
      data={data}
      sliderWidth={windowWidth}
      itemWidth={windowWidth}
      renderItem={_renderItem}
      activeDotIndex
      autoplay={true}
      autoplayDelay={2000}
      autoplayInterval={3000}
      onSnapToItem={index => setActiveSlide(index)}
      activeAnimationType="timing"
      loop={true}
    />
  );
}

const styles = StyleSheet.create({});
