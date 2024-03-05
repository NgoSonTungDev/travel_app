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
  Search: undefined;
  Tabs: NavigatorScreenParams<TabsParamList>;
};

export type TabsParamList = {
  Home: undefined;
  Notification: undefined;
  Location: undefined;
  Favourite: undefined;
  Account: undefined;
};

export type TabsHomeScreen = {
  Post: undefined;
  Info: undefined;
};
