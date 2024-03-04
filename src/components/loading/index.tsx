import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../constants/colors';
import {DEVICE_HEIGHT} from '../../utils/dimension';

const Loading = () => {
  return (
    <View style={{height: DEVICE_HEIGHT, backgroundColor: colors.while}}>
      <ActivityIndicator style={{marginTop: 10}} />
    </View>
  );
};

export default Loading;
