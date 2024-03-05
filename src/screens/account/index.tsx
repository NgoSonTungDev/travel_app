import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import {colors} from '../../constants/colors';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/dimension';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TabsHomeScreen} from '../../types/navigation';
import Post from './post';
import Information from './info';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator<TabsHomeScreen>();

const screenList: {
  name: keyof TabsHomeScreen;
  component: any;
  label: string;
}[] = [
  {
    name: 'Post',
    label: 'Bài viết',
    component: Post,
  },
  {
    name: 'Info',
    label: 'Thông tin',
    component: Information,
  },
];

const AccountScreen = () => {
  return (
    <View style={style.root}>
      <View style={style.top}>
        <Image
          style={style.coverImage}
          src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/296165807_1104680843789736_327696247056954204_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=783fdb&_nc_eui2=AeErBhbn0mw7ktSQzEaXFiZxQJSYpnEG21lAlJimcQbbWRxdGAAPRRDsJJrE5MbVJIxDhn9wdAq8-HPnRDPknm5r&_nc_ohc=uTV8YeTXSmUAX_jXUyQ&_nc_oc=AQkWcJcgy9mKbOQzl1ZWu4hD662-6r4xhAN41xilJGisR4yDJrI17SRUu-oQs1yCWBq_vHb1ioAPvtyOCoJs9k16&_nc_ht=scontent.fdad3-1.fna&oh=00_AfAvHzs9nTPtbVTl3wLeK7wLbUx0itgkcDX7albLPpn5ZA&oe=65ECA1D6"
        />
        <Image
          style={style.avt}
          src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/426550216_1450731499184667_571040148054909699_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGj29mSa4NNdhXwRLy61emlWZBaU0lBBQxZkFpTSUEFDP2JJf0touzHQWZZwraiAqMOUiN28h4CvZf7gCSN5Ft9&_nc_ohc=Qp7mGNZCUiQAX8r6yrU&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDijMJFuHCaR48W1P7ZAucQoVlypCYsjwZgvKBSAWdNbw&oe=65EB6787"
        />
        <Text style={style.name}>Ngô Sơn Tùng</Text>
      </View>
      <SafeAreaView style={style.tabs}>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: true,
            tabBarStyle: {height: 40},
          }}>
          {screenList.map((item, index) => {
            return (
              <Tab.Screen
                key={item.name + index.toString()}
                name={item.name}
                component={item.component}
                options={{
                  tabBarLabel: item.label,
                }}
              />
            );
          })}
        </Tab.Navigator>
      </SafeAreaView>
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.while,
  },
  top: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.35,
  },
  coverImage: {
    width: DEVICE_WIDTH,
    height: 200,
  },
  avt: {
    width: 120,
    height: 120,
    borderRadius: 120,
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  name: {
    fontWeight: 'bold',
    bottom: 15,
    left: 129,
    fontSize: 20,
    position: 'absolute',
  },
  tabs: {
    flex: 1,
    // height: 2200,
    backgroundColor: 'red',
  },
});

export default AccountScreen;
