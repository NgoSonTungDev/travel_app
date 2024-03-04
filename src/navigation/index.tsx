import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import TopNavigation from '../components/top_navigation';
import ForgotPasswordScreen from '../screens/forgot_password';
import LoginScreen from '../screens/login';
import OtpScreen from '../screens/otp';
import RegisterScreen from '../screens/register';
import SearchScreen from '../screens/search';
import {RootParamList} from '../types/navigation';

const Stack = createStackNavigator<RootParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OTP" component={OtpScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Tabs" component={TopNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
