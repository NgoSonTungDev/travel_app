import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import HomeScreen from '../../screens/home';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {TabsParamList} from '../../types/navigation';

const Tab = createMaterialTopTabNavigator<TabsParamList>();

const TopNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default TopNavigation;
