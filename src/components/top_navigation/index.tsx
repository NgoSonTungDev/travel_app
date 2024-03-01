import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {colors} from '../../constants/colors';
import FavouriteScreen from '../../screens/favourite';
import HomeScreen from '../../screens/home';
import LocationScreen from '../../screens/location';
import NotificationScreen from '../../screens/notification';
import {TabsParamList} from '../../types/navigation';
import {images} from '../../utils/constants';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/dimension';
import AccountScreen from '../../screens/account';

const Tab = createMaterialTopTabNavigator<TabsParamList>();

const screenList: {
  name: keyof TabsParamList;
  component: JSX.Element;
  icon: any;
  activeIcon: any;
}[] = [
  {
    name: 'Home',
    component: <HomeScreen />,
    icon: images.homeIcon,
    activeIcon: images.homeActiveIcon,
  },

  {
    name: 'Location',
    component: <LocationScreen />,
    icon: images.locationIcon,
    activeIcon: images.locationActiveIcon,
  },
  {
    name: 'Favourite',
    component: <FavouriteScreen />,
    icon: images.heartIcon,
    activeIcon: images.heartActiveIcon,
  },
  {
    name: 'Notification',
    component: <NotificationScreen />,
    icon: images.notificationIcon,
    activeIcon: images.notificationActiveIcon,
  },
  {
    name: 'Account',
    component: <AccountScreen />,
    icon: images.accountIcon,
    activeIcon: images.accountActiveIcon,
  },
];

const TopNavigation = () => {
  const sizeIcon = 18;
  return (
    <React.Fragment>
      <View style={style.root}>
        <Text style={style.textTitle}>MAFLINE</Text>
        <IconButton
          icon={({color}) => (
            <Image
              source={images.searchIcon}
              style={{width: 15, height: 15, tintColor: color}}
            />
          )}
          size={15}
          mode="outlined"
          onPress={() => console.log('Pressed')}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {height: 40},
        }}>
        {screenList.map((item, index) => {
          return (
            <Tab.Screen
              key={item.name + index.toString()}
              name={item.name}
              component={() => {
                return item.component;
              }}
              options={{
                tabBarActiveTintColor: colors.primary,
                tabBarIcon: ({focused}) => {
                  return (
                    <View>
                      <Image
                        source={focused ? item.activeIcon : item.icon}
                        style={{
                          width: sizeIcon,
                          height: sizeIcon,
                          tintColor: focused ? colors.primary : undefined,
                        }}
                      />
                    </View>
                  );
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
    </React.Fragment>
  );
};

const style = StyleSheet.create({
  root: {
    backgroundColor: colors.while,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.06,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.driver,
    borderBottomWidth: 1,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TopNavigation;
