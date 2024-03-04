import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import CardPlace from '../../components/card_place';
import EmptyMessage from '../../components/empty_message';
import {initFilterPlace} from '../../constants/common';
import {useIsRequestPending} from '../../hooks/use_status';
import {useAppDispatch} from '../../store';
import {getPlaces} from '../../store/place/place_action';
import {IPlace} from '../../types/place';

const LocationScreen = () => {
  const dispatch = useAppDispatch();

  const isLoading = useIsRequestPending('post', 'getPost');

  const [data, setData] = useState<IPlace[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const fetchApi = () => {
    dispatch(getPlaces(initFilterPlace))
      .unwrap()
      .then(data => {
        setData(data.data.data);
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{gap: 5}}>
        {isLoading && !refreshing ? (
          <ActivityIndicator />
        ) : isEmpty(data) ? (
          <EmptyMessage />
        ) : (
          data.map(item => {
            return <CardPlace key={item._id} type="place" item={item} />;
          })
        )}
      </View>
    </ScrollView>
  );
};

export default LocationScreen;
