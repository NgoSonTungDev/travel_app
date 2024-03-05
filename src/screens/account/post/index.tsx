import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CardPost from '../../../components/card_post';
import EmptyMessage from '../../../components/empty_message';
import Loading from '../../../components/loading';
import {useIsRequestPending} from '../../../hooks/use_status';
import {useAppDispatch} from '../../../store';
import {getPostByUserId} from '../../../store/post/post_action';
import {IPost} from '../../../types/post';

const Post = () => {
  const dispatch = useAppDispatch();

  const isLoading = useIsRequestPending('post', 'getPostByUserId');

  const [data, setData] = useState<IPost[]>([]);

  const fetchApi = () => {
    dispatch(getPostByUserId('63fd6883ea9627ba24c33075'))
      .unwrap()
      .then(data => {
        setData(data.data);
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <ScrollView style={{gap: 5}}>
      {isLoading ? (
        <Loading />
      ) : isEmpty(data) ? (
        <EmptyMessage />
      ) : (
        data.map(item => {
          return <CardPost key={item._id} item={item} />;
        })
      )}
    </ScrollView>
  );
};

export default Post;
