import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import CardNotify from '../../components/card_notify';
import {colors} from '../../constants/colors';
import {useAppDispatch} from '../../store';
import {getNotifyByUserId} from '../../store/auth/auth_action';
import {INotify} from '../../types/notify';
import {useIsRequestPending} from '../../hooks/use_status';
import {ActivityIndicator} from 'react-native-paper';
import {isEmpty} from 'lodash';
import EmptyMessage from '../../components/empty_message';

const NotificationScreen = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<INotify[]>([]);

  const isLoading = useIsRequestPending('auth', 'getNotifyByUserId');

  useEffect(() => {
    dispatch(getNotifyByUserId('63fd6883ea9627ba24c33075'))
      .unwrap()
      .then(data => {
        setData(data.data);
      });
    return () => {
      setData([]);
    };
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.while,
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : isEmpty(data) ? (
        <EmptyMessage />
      ) : (
        data.map(item => <CardNotify item={item} key={item._id} />)
      )}
    </ScrollView>
  );
};

export default NotificationScreen;
