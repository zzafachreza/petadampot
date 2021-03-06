import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import {colors} from '../../utils/colors';

var whoosh = new Sound(
  require('../../assets/suara.mp3'),
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        whoosh.getDuration() +
        'number of channels: ' +
        whoosh.getNumberOfChannels(),
    );
  },
);

export default function MyHeader({keterangan, tipe}) {
  const [speaker, setSepeaker] = useState(false);
  const saklar = x => {
    setSepeaker(x);
  };

  useEffect(() => {
    setTimeout(() => {
      whoosh.play(res => {
        console.log('suara', res);
      });
    }, 100);
  }, []);

  return (
    <View
      style={{
        // flex: 1,
        // backgroundColor: 'red',
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'blue',
        }}>
        {!speaker ? (
          <TouchableOpacity
            onPress={() => {
              saklar(true);
              // alert('mute');
              // Pause the sound
              whoosh.stop();
            }}
            style={{
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'yellow',
            }}>
            <Icon
              name="volume-high"
              type="ionicon"
              color={colors.black}
              size={35}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              saklar(false);
              whoosh.play();
              // whoosh.stop();
            }}
            style={{
              // marginRight: 100,

              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'yellow',
            }}>
            <Icon
              name="volume-mute"
              type="ionicon"
              color={colors.black}
              size={35}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
