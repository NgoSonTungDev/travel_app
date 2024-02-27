import React, {ReactNode, useState} from 'react';
import {Button, ImageBackground, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {DEVICE_HEIGHT} from '../../utils/dimension';
import {colors} from '../../constants/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {images} from '../../utils/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FormTextInput} from '../../components/hook_form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

type TStep = 'email' | 'verify';

interface IFormState {
  email?: string;
  code_otp: string;
  new_password: string;
  confirm_password: string;
}

const validationInput = yup.object().shape({
  email: yup.string(),
  code_otp: yup
    .string()
    .required('OTP không được để trống')
    .min(6, 'Mã OTP ít nhất 6 ký tự!!!')
    .max(6, 'Mã OTP tối đa 6 ký tự!!!'),
  new_password: yup
    .string()
    .min(6, 'Mật khẩu ít nhất 6 ký tự !!!')
    .max(30, 'Mật khẩu tối đa 30 ký tự !!!')
    .required('Mật khẩu không được để trống'),
  confirm_password: yup
    .string()
    .required('Xác nhận mật khẩu không được để trống')
    .oneOf([yup.ref('new_password')], 'Không trùng khớp.'),
});

const ForgotPasswordScreen = () => {
  const [step, setStep] = useState<TStep>('email');

  const {control} = useForm<IFormState>({
    defaultValues: {
      email: '',
      code_otp: '',
      new_password: '',
      confirm_password: '',
    },
    resolver: yupResolver(validationInput),
  });

  const renderContent = (key: TStep) => {
    const content: {[key in TStep]: JSX.Element} = {
      email: (
        <View style={{marginTop: 15}}>
          <FormTextInput control={control} label="Email" name="email" />
        </View>
      ),
      verify: (
        <View style={{marginTop: 15}}>
          <FormTextInput control={control} label="Email" name="code_otp" />
          <FormTextInput
            control={control}
            label="Password"
            name="new_password"
            type="password"
          />
          <FormTextInput
            control={control}
            label="Password"
            name="confirm_password"
            type="password"
          />
        </View>
      ),
    };

    return content[key] || content.email;
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
          <View>
            <Text style={style.textTitle}>Forgot</Text>
            <Text style={style.textTitle}>Password?</Text>
            {renderContent(step)}
          </View>
          <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <Button
              onPress={() => {}}
              title="continue"
              color={colors.primary}
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
    fontSize: 42,
    fontWeight: 'bold',
  },
  textContent: {
    color: colors.grey,
    fontSize: 14,
    marginTop: 5,
  },
});

export default ForgotPasswordScreen;
