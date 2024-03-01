import {yupResolver} from '@hookform/resolvers/yup';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, ImageBackground, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text} from 'react-native-paper';
import * as yup from 'yup';
import {FormTextInput} from '../../components/hook_form';
import {colors} from '../../constants/colors';
import {useAppDispatch} from '../../store';
import {login} from '../../store/auth/auth_action';
import {RootParamList} from '../../types/navigation';
import {images} from '../../constants/images';
import {DEVICE_HEIGHT} from '../../utils/dimension';
import axios from 'axios';

interface IFormState {
  email: string;
  password: string;
}

const validationInput = yup.object().shape({
  email: yup
    .string()
    .required('Email đăng nhập không được để trống')
    .email('Chưa đúng định dạng email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu ít nhất 6 ký tự !!!')
    .max(30, 'Mật khẩu tối đa 30 ký tự !!!')
    .required('Mật khẩu không được để trống'),
});

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const {params} = useRoute<RouteProp<RootParamList, 'Login'>>();

  const navigationRegisterScreen = () => {
    navigation.navigate('Register');
  };

  const navigationForgotPasswordScreen = () => {
    navigation.navigate('ForgotPassword');
  };

  const {control} = useForm<IFormState>({
    defaultValues: {
      email: params ? params.email : '',
      password: '',
    },
    resolver: yupResolver(validationInput),
  });

  const handleLogin = () => {
    // dispatch(
    //   login({
    //     email: 'sontung22@gmail.com',
    //     password: 'sontung22@gmail.com',
    //   }),
    // )
    //   .unwrap()
    //   .then(data => {
    //     console.log({data});
    //   })
    //   .catch(err => {
    //     console.log({err});
    //   });
    navigation.navigate('Tabs', {screen: 'Home'});
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
            <Text style={style.textTitle}>Back</Text>
            <Text style={style.textContent}>Sign in to continue</Text>
            <View style={{marginTop: 15}}>
              <FormTextInput control={control} label="Email" name="email" />
              <FormTextInput
                control={control}
                label="Password"
                name="password"
                type="password"
              />
            </View>
            <TouchableOpacity style={{marginTop: 5}}>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'right',
                }}
                onPress={navigationForgotPasswordScreen}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <Text style={style.textContent}>
              Create new account?{' '}
              <Text
                style={{color: colors.primary}}
                onPress={navigationRegisterScreen}>
                Sign up
              </Text>
            </Text>
            <Button
              onPress={handleLogin}
              title="Login"
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

export default LoginScreen;
