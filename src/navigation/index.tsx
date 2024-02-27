import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import ForgotPasswordScreen from '../screens/forgot_password';
import HomeScreen from '../screens/home';
import OtpScreen from '../screens/otp';

const Stack = createStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
