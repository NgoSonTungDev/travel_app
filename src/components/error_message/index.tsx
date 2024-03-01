import {isEqual} from 'lodash';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Button} from 'react-native-paper';

interface ErrorMessageProps {
  title?: string;
  buttonTitle?: string;
  onPress: () => void;
  marginTop?: number;
  style?: StyleProp<ViewStyle>;
}

const ErrorMessage = ({
  title,
  buttonTitle,
  onPress,
  style,
  marginTop = 15,
}: ErrorMessageProps) => {
  return (
    <View style={[styles.root, {marginTop}, style]}>
      <Text style={styles.title}>{title ? title : 'Đã có lỗi xảy ra!'}</Text>

      <Button mode="contained" onPress={onPress}>
        {buttonTitle ? buttonTitle : 'Thử lại'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, alignItems: 'center'},
  title: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 15,
  },
});

export default React.memo(ErrorMessage, isEqual);
