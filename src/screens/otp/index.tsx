import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text} from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {colors} from '../../constants/colors';
import {RootParamList} from '../../types/navigation';
import {images} from '../../constants/images';
import {DEVICE_HEIGHT} from '../../utils/dimension';
import {useAppDispatch} from '../../store';
import {register, verifyEmailRegister} from '../../store/auth/auth_action';
import LoadingButton from '../../components/loading_button';
import {useIsRequestPending} from '../../hooks/use_status';

const OtpScreen = () => {
  const dispatch = useAppDispatch();
  const {params} = useRoute<RouteProp<RootParamList, 'OTP'>>();

  const [code, setCode] = useState<string>('');
  const [color, setColor] = useState<'#636e72' | '#2ecc71' | '#d63031'>(
    '#636e72',
  );

  const isLoadingResendEmail = useIsRequestPending(
    'auth',
    'verifyEmailRegister',
  );
  const isLoadingRegister = useIsRequestPending('auth', 'register');

  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const resendOTP = () => {
    dispatch(
      verifyEmailRegister({email: params.email, userName: params.userName}),
    );
  };

  const handleRegister = () => {
    if (code.length < 6) return;
    dispatch(
      register({
        codeOtp: code,
        email: params.email,
        password: params.password,
        userName: params.userName,
      }),
    )
      .unwrap()
      .then(() => {
        setColor('#2ecc71');
        setTimeout(() => {
          navigation.navigate('Login', {email: params.email});
        }, 1000);
      })
      .catch(() => {
        setColor('#d63031');
      });
  };

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
              <Text style={{fontWeight: 'bold'}}>{params.email}</Text>
            </Text>
            <SmoothPinCodeInput
              cellSize={35}
              codeLength={6}
              placeholder={'*'}
              cellStyle={{
                borderBottomWidth: 2,
                borderColor: color,
              }}
              cellStyleFocused={{
                borderColor: 'black',
              }}
              textStyle={{
                color: color,
              }}
              value={code}
              onTextChange={(code: any) => setCode(code)}
            />
          </View>

          <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <Text style={style.textContent}>
              Did't receive the Verification OTP?{' '}
              {isLoadingResendEmail ? (
                <ActivityIndicator />
              ) : (
                <Text style={{color: colors.primary}} onPress={resendOTP}>
                  Resend again
                </Text>
              )}
            </Text>
            <LoadingButton
              title="Verify"
              callBack={handleRegister}
              loading={isLoadingRegister}
            />
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
