import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

interface EmptyMessageProps {
  title?: string;
  marginTop?: number;
  style?: StyleProp<ViewStyle>;
}

const EmptyMessage = ({title, marginTop = 20, style}: EmptyMessageProps) => {
  return (
    <View style={[styles.root, {marginTop}, style]}>
      <Text style={styles.title}>
        {title ? title : 'Không có dữ liệu nào!'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, alignItems: 'center'},
  title: {
    textAlign: 'center',
    fontSize: 14,
  },
});

export default EmptyMessage;
