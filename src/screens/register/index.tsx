import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {
  Button,
  ImageBackground,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text} from 'react-native-paper';
import * as yup from 'yup';
import {FormTextInput} from '../../components/hook_form';
import {colors} from '../../constants/colors';
import {images} from '../../constants/images';
import {DEVICE_HEIGHT} from '../../utils/dimension';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../store';
import {login, verifyEmailRegister} from '../../store/auth/auth_action';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {toastMessage} from '../../utils/toast';
import {useIsRequestPending} from '../../hooks/use_status';
import LoadingButton from '../../components/loading_button';

const validationInput = yup.object().shape({
  userName: yup
    .string()
    .required('Tên tài khoản không được để trống.')
    .min(5, 'Tên tài khoản tối thiểu 5 ký tự.')
    .max(30, 'Tên tài khoản tối đa 30 ký tự.'),
  email: yup.string().required('Email không được để trống').email(),
  password: yup.string().required('Mật khẩu không được để trống'),
  confirmPassword: yup
    .string()
    .required('Xác nhận mật khẩu không được để trống')
    .oneOf([yup.ref('password')], 'Không trùng khớp.'),
});

interface IFormState {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const isLoading = useIsRequestPending('auth', 'verifyEmailRegister');

  const {control, handleSubmit} = useForm<IFormState>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validationInput),
  });

  const onSubmit = (value: IFormState) => {
    Keyboard.dismiss();
    dispatch(
      verifyEmailRegister({email: value.email, userName: value.userName}),
    )
      .unwrap()
      .then(data => {
        console.log(data);
        navigation.navigate('OTP', {
          email: value.email,
          password: value.password,
          userName: value.userName,
        });
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
          <View>
            <Text style={style.textTitle}>Welcome</Text>
            <Text style={style.textTitle}>User</Text>
            <Text style={style.textContent}>Sign in to join</Text>
            <View style={{marginTop: 25}}>
              <FormTextInput
                control={control}
                label="UserName"
                name="userName"
              />
              <FormTextInput control={control} label="Email" name="email" />
              <FormTextInput
                control={control}
                label="Password"
                name="password"
                type="password"
              />
              <FormTextInput
                control={control}
                label="ConfirmPassword"
                name="confirmPassword"
                type="password"
              />
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <Text style={style.textContent}>
              Create new account?{' '}
              <Text
                style={{color: colors.primary}}
                onPress={() => {
                  navigation.goBack();
                }}>
                Sign in
              </Text>
            </Text>
            <LoadingButton
              title="Continue"
              callBack={handleSubmit(onSubmit)}
              loading={isLoading}
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

export default RegisterScreen;
