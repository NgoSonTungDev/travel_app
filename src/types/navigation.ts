import {NavigatorScreenParams} from '@react-navigation/native';

export type RootParamList = {
  Login: {
    email: string;
  };
  Register: undefined;
  OTP: {
    userName: string;
    email: string;
    password: string;
  };
  ForgotPassword: undefined;
  Tabs: NavigatorScreenParams<TabsParamList>;
};

export type TabsParamList = {
  Home: undefined;
};
