import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {INotify} from '../../types/notify';
import {momentLocale} from '../../utils/common';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/dimension';
import {colors} from '../../constants/colors';

const CardNotify = ({item}: {item: INotify}) => {
  const style = StyleSheet.create({
    root: {
      width: DEVICE_WIDTH,
      height: DEVICE_HEIGHT * 0.1,
      paddingHorizontal: 10,
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      backgroundColor: item.status ? '#eee' : undefined,
    },
    image: {
      height: 45,
      width: 45,
      borderRadius: 50,
    },
    title: {
      color: colors.black,
      fontSize: 15,
    },
    content: {
      fontSize: 12,
    },
  });

  return (
    <View style={style.root}>
      <Image
        style={style.image}
        source={{
          uri: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
        }}
      />

      <View style={{width: DEVICE_WIDTH * 0.8}}>
        <Text style={style.title}>{item.content}</Text>
        <Text style={style.content}>{momentLocale(item.dateTime)}</Text>
      </View>
    </View>
  );
};

export default CardNotify;
