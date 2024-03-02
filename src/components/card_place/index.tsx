import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Rating} from 'react-native-ratings';
import {colors} from '../../constants/colors';
import {formatMoney} from '../../utils/common';
import {DEVICE_WIDTH} from '../../utils/dimension';
import {images} from '../../constants/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IPlace} from '../../types/place';

const CardPlace = ({
  type,
  item,
}: {
  type: 'place' | 'favorite';
  item: IPlace;
}) => {
  const renderItemCheckTime = (open: number, close: number) => {
    const start = moment(open).format('HH:mm');
    const end = moment(close).format('HH:mm');
    const check2 = moment(new Date()).format('HH:mm');

    const isCheckBetweenStartAndEnd = moment(check2, 'HH:mm').isBetween(
      moment(start, 'HH:mm'),
      moment(end, 'HH:mm'),
    );

    if (isCheckBetweenStartAndEnd) {
      return <Text style={{color: '#2ecc71'}}>Đang mở cửa </Text>;
    } else {
      return <Text style={{color: '#c0392b'}}>Đang đóng cửa </Text>;
    }
  };

  return (
    <View style={style.root}>
      <Image src={item.image?.[0] || ''} style={style.image} />
      <Text style={style.title}>{item.name}</Text>
      <View style={{gap: 3}}>
        <View style={style.box}>
          <Text>Đánh giá:</Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={13}
            startingValue={item.rating}
          />
          <Text>({item.rating})</Text>
        </View>
        <View style={style.box}>
          <Text>Khoảng giá:</Text>
          <Text>
            {formatMoney(item.startingPrice)} - {formatMoney(item.LastPrice)}
          </Text>
        </View>
        <View style={style.box}>
          <Text>Địa chỉ:</Text>
          <Text>{item.address}</Text>
        </View>
        <View style={style.box}>
          <Text>Thời gian:</Text>
          <Text>
            {moment(item.openTime).format('HH:mm')} -{' '}
            {moment(item.closeTime).format('HH:mm')}
          </Text>
        </View>
        <View style={style.box}>
          <Text>Trạng thái:</Text>
          <Text>{renderItemCheckTime(item.openTime, item.closeTime)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={images.heartIcon}
          style={{
            width: 20,
            height: 20,
            tintColor: colors.primary,
            position: 'absolute',
            right: 5,
            bottom: 90,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    width: DEVICE_WIDTH,
    padding: 10,
    backgroundColor: colors.while,
    flexDirection: 'column',
    gap: 5,
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 17,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default CardPlace;
