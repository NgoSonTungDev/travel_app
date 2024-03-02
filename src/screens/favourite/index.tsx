import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import CardPost from '../../components/card_post';
import EmptyMessage from '../../components/empty_message';
import {useIsRequestPending} from '../../hooks/use_status';
import {useAppDispatch} from '../../store';
import {getListFavorite} from '../../store/place/place_action';
import {IFavoritePlace, IPlace} from '../../types/place';
import CardPlace from '../../components/card_place';

const FavouriteScreen = () => {
  const dispatch = useAppDispatch();

  const isLoading = useIsRequestPending('post', 'getPost');

  const [data, setData] = useState<IFavoritePlace[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const fetchApi = () => {
    dispatch(getListFavorite('63fd6883ea9627ba24c33075'))
      .unwrap()
      .then(data => {
        setData(data.data);
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
        {isLoading ? (
          <ActivityIndicator />
        ) : isEmpty(data) ? (
          <EmptyMessage />
        ) : (
          data.map(item => {
            return (
              <CardPlace key={item._id} item={item.placeId} type="favorite" />
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default FavouriteScreen;
