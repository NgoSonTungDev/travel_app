import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text} from 'react-native-paper';
import * as yup from 'yup';
import {FormTextInput} from '../../components/hook_form';
import LoadingButton from '../../components/loading_button';
import {colors} from '../../constants/colors';
import {useIsRequestPending} from '../../hooks/use_status';
import {useAppDispatch} from '../../store';
import {
  updatePassword,
  verifyEmailForgotPassword,
} from '../../store/auth/auth_action';
import {images} from '../../constants/images';
import {DEVICE_HEIGHT} from '../../utils/dimension';
import {toastMessage} from '../../utils/toast';
import {validateEmail} from '../../utils/common';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../types/navigation';

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
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const [step, setStep] = useState<TStep>('email');

  const isLoading = useIsRequestPending('auth', 'verifyEmailForgotPassword');

  const {control, handleSubmit, watch, setError, reset} = useForm<IFormState>({
    defaultValues: {
      email: '',
      code_otp: '',
      new_password: '',
      confirm_password: '',
    },
    resolver: yupResolver(validationInput),
    mode: 'all',
  });

  const handleSendMail = () => {
    const email = watch('email');

    if (!email) return;

    if (validateEmail(email) === null) {
      return setError('email', {message: 'Email không hợp lệ !'});
    }

    dispatch(verifyEmailForgotPassword(email as string))
      .unwrap()
      .then(() => {
        setStep('verify');
        reset();
        toastMessage.info('Vui lòng kiểm tra email của bạn !!!');
      });
  };

  const handleUpdatePassword = (data: IFormState) => {
    dispatch(
      updatePassword({
        codeOtp: data.code_otp,
        password: data.new_password,
        userId: '',
      }),
    )
      .unwrap()
      .then(() => {
        setStep('email');
        navigation.navigate('Login', {email: ''});
      });
  };

  const renderContent = (key: TStep) => {
    const content: {[key in TStep]: JSX.Element} = {
      email: (
        <View style={{marginTop: 15}}>
          <FormTextInput control={control} label="Email" name="email" />
        </View>
      ),
      verify: (
        <View style={{marginTop: 15}}>
          <FormTextInput control={control} label="OTP" name="code_otp" />
          <FormTextInput
            control={control}
            label="New password"
            name="new_password"
            type="password"
          />
          <FormTextInput
            control={control}
            label="Confirm password"
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
            {step === 'email' ? (
              <LoadingButton
                callBack={handleSendMail}
                loading={isLoading}
                title="Continue"
              />
            ) : (
              <LoadingButton
                callBack={handleSubmit(handleUpdatePassword)}
                loading={isLoading}
                title="Verify"
              />
            )}
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
