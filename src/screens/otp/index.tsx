import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Button, Image, ImageBackground, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text} from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {colors} from '../../constants/colors';
import {RootParamList} from '../../types/navigation';
import {images} from '../../utils/constants';
import {DEVICE_HEIGHT} from '../../utils/dimension';

const OtpScreen = () => {
  const [code, setCode] = useState();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <KeyboardAwareScrollView
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground
        source={images.loginBg}
        resizeMode="cover"
        style={{flex: 1}}>
        <View style={style.root}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              alignItems: 'center',
            }}>
            <Image
              source={images.otpImage}
              style={{
                width: 200,
                height: 150,
                objectFit: 'contain',
              }}
            />
            <Text style={style.textTitle}>OTP Verification</Text>
            <Text style={style.textContent}>
              Enter the OTP sent to{' '}
              <Text style={{fontWeight: 'bold'}}>ngosontung0309@gmail.com</Text>
            </Text>
            <SmoothPinCodeInput
              cellSize={35}
              codeLength={6}
              placeholder={'*'}
              cellStyle={{
                borderBottomWidth: 2,
                borderColor: '#eeeeee',
              }}
              cellStyleFocused={{
                borderColor: 'black',
              }}
              textStyle={{
                color: '#2ecc71',
              }}
              value={code}
              onTextChange={(code: any) => setCode(code)}
            />
          </View>

          <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <Text style={style.textContent}>
              Did't receive the Verification OTP?{' '}
              <Text style={{color: colors.primary}} onPress={() => {}}>
                Resend again
              </Text>
            </Text>
            <Button onPress={() => {}} title="Verify" color={colors.primary} />
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};
const style = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: DEVICE_HEIGHT * 0.07,
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContent: {
    color: colors.grey,
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default OtpScreen;
