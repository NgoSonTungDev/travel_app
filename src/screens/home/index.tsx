import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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

  useEffect(() => {
    dispatch(getPost(initFilterPost))
      .unwrap()
      .then(data => {
        setData(data.data.data);
      });
  }, []);

  return (
    <ScrollView>
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
