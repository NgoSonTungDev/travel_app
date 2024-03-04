import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {
  RefreshControl,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/AntDesign';
import CardPlace from '../../components/card_place';
import EmptyMessage from '../../components/empty_message';
import Loading from '../../components/loading';
import {colors} from '../../constants/colors';
import {initFilterPlace} from '../../constants/common';
import {useIsRequestPending} from '../../hooks/use_status';
import {useAppDispatch, useAppSelector} from '../../store';
import {getPlaces} from '../../store/place/place_action';
import {RootParamList} from '../../types/navigation';
import {IFilterPlace, IPlace} from '../../types/place';
import {useDelayTimeout} from '../../hooks/use_delay';
import {changeFilter, refreshData} from '../../store/place/place_slice';

const SearchScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const isLoading = useIsRequestPending('place', 'getPlaces');
  const delay = useDelayTimeout();

  const {data, filter} = useAppSelector(state => state.placeSlice);

  const handleSearch = (search: string) => {
    if (search) {
      Keyboard.dismiss();
    }
    delay(() => {
      dispatch(changeFilter({...filter, placeName: search}));
    });
  };

  const fetchApi = () => {
    dispatch(getPlaces(filter));
  };

  useEffect(() => {
    fetchApi();

    return () => {
      dispatch(refreshData());
    };
  }, [filter]);

  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Icons
          name="arrowleft"
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={e => {
            handleSearch(e);
          }}
          placeholder="Search"
        />
      </View>
      <ScrollView style={styles.body}>
        <View style={{gap: 5}}>
          {isLoading ? (
            <Loading />
          ) : isEmpty(data?.data) ? (
            <EmptyMessage />
          ) : (
            data.data.map(item => {
              return <CardPlace key={item._id} type="place" item={item} />;
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  top: {
    backgroundColor: colors.while,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: colors.driver,
    borderBottomWidth: 1,
  },
  icon: {
    fontSize: 23,
    color: colors.black,
  },
  input: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  body: {
    flex: 1,
  },
});

export default SearchScreen;
