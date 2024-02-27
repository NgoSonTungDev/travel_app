import {StackScreenProps} from '@react-navigation/stack';

export type RootParamList = {
  Login: undefined;
  Register: undefined;
  OTP: {
    userName: string;
    email: string;
    password: string;
  };
  ForgotPassword: undefined;
  Home: undefined;
};
