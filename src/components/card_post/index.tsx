import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {colors} from '../../constants/colors';
import {images} from '../../constants/images';
import {IPost} from '../../types/post';
import {momentLocale} from '../../utils/common';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/dimension';
import {useAppDispatch} from '../../store';
import {addPost} from '../../store/post/post_action';
import {toastMessage} from '../../utils/toast';

const CardPost = ({item}: {item: IPost}) => {
  const sizeIcon = 15;
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSharePost = () => {
    setLoading(true);

    dispatch(
      addPost({
        content: item.content,
        image: item.image,
        placeId: item.placeId._id,
        public: true,
        time: Number(new Date()),
        rating: item.rating,
        userId: item.userId._id,
      }),
    )
      .unwrap()
      .then(() => {
        toastMessage.success('Chia sẻ thành công');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const actionList: {
    title: string;
    icon: any;
    action: () => void;
  }[] = [
    {
      title: 'Thích',
      icon: images.likeIcon,
      action: () => {},
    },
    {
      title: 'Bình luận',
      icon: images.commentIcon,
      action: () => {},
    },
    {
      title: 'Chia sẻ',
      icon: images.shareIcon,
      action: () => {
        handleSharePost();
      },
    },
  ];

  return (
    <View style={style.root}>
      <View style={style.top}>
        <Image
          src={item.userId.avt}
          style={{height: 40, width: 40, borderRadius: 50}}
        />
        <View style={{gap: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={style.textName}>{item.userId.userName}</Text>
            <Text style={style.textName}>{'>'}</Text>
            <Text style={style.textName}>{item.placeId.name}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={13}
              startingValue={item.rating}
            />
            <Text style={{fontSize: 12}}>{momentLocale(item.time)}</Text>
          </View>
        </View>
      </View>
      <Image
        src={item.image}
        style={{
          width: '100%',
          height: DEVICE_HEIGHT * 0.5,
          objectFit: 'cover',
        }}
      />
      <Text>{item.like.length} lượt thích</Text>
      <View style={style.bot}>
        {actionList.map(item => (
          <TouchableOpacity
            onPress={item.action}
            style={{flex: 1}}
            key={item.title}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                justifyContent: 'center',
              }}>
              <Image
                source={item.icon}
                style={{
                  width: sizeIcon,
                  height: sizeIcon,
                  tintColor: colors.black,
                }}
              />
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    width: DEVICE_WIDTH,
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
  },
  top: {
    flexDirection: 'row',
    gap: 10,
  },
  textName: {
    fontWeight: 'bold',
  },
  bot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CardPost;
