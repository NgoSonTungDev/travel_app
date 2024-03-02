import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator, Text} from 'react-native-paper';
import CardPost from '../../components/card_post';
import {useAppDispatch} from '../../store';
import {initFilterPost} from '../../constants/common';
import {getPost} from '../../store/post/post_action';
import {IPost} from '../../types/post';
import {useIsRequestPending} from '../../hooks/use_status';
import {isEmpty} from 'lodash';
import EmptyMessage from '../../components/empty_message';

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const isLoading = useIsRequestPending('post', 'getPost');

  const [data, setData] = useState<IPost[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const fetchApi = () => {
    dispatch(getPost(initFilterPost))
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
        {isLoading ? (
          <ActivityIndicator />
        ) : isEmpty(data) ? (
          <EmptyMessage />
        ) : (
          data.map(item => {
            return <CardPost key={item._id} item={item} />;
          })
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
