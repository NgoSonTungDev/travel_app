import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {DEVICE_HEIGHT} from '../../utils/dimension';
import {colors} from '../../constants/colors';

const LoginScreen = () => {
  return (
    <View style={style.root}>
      <View>
        <Text style={style.textTitle}>Welcome</Text>
        <Text style={style.textTitle}>Back</Text>
        <Text
          style={{
            color: colors.grey,
            fontSize: 16,
          }}>
          Sign in to continue
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: DEVICE_HEIGHT * 0.05,
  },
  textTitle: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
