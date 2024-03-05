import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from '../../../constants/colors';
import Icons1 from 'react-native-vector-icons/Feather';
import Icons2 from 'react-native-vector-icons/AntDesign';

const Information = () => {
  const detail = {
    address: '120 nguyên huy tưởng',
    avt: 'https://scarpa-us.com/wp-content/uploads/2020/05/cham-toi-ky-quan-tien-canh-trong-sieu-pham-avatar-.jpeg',
    createdAt: '2023-02-28T02:35:47.786Z',
    email: 'sontung22@gmail.com',
    gender: 'Nam',
    isAdmin: 1,
    isLock: false,
    numberPhone: '0526865968',
    password: '$2b$10$pDNwfpsBkGOggVF9P80uaurCKYwNLSGbltERmSyN1Sn/bJnNfV3ly',
    updatedAt: '2024-02-27T08:04:40.597Z',
    userName: 'huyhoangtest',

    _id: '63fd6883ea9627ba24c33075',
  };

  return (
    <View style={style.root}>
      <View>
        <View style={style.card}>
          <Icons1 name="help-circle" size={30} />
          <Text style={style.text}>Trợ giúp & hổ trợ</Text>
          <Icons2 name="arrowright" size={20} />
        </View>
        <View style={style.card}>
          <Icons1 name="settings" size={30} />
          <Text style={style.text}>Cài đặt và quyền riêng tư</Text>
          <Icons2 name="arrowright" size={20} />
        </View>
        <View style={style.card}>
          <Icons1 name="help-circle" size={30} />
          <Text style={style.text}>Cài đặt và quyền riêng tư</Text>
          <Icons2 name="arrowright" size={20} />
        </View>
      </View>
      <Button onPress={() => {}} title="Logout" color={colors.error} />
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.while,
    gap: 5,
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: colors.driver,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
  },
});

export default Information;
