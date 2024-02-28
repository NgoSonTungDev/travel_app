import React from 'react';
import {colors} from '../../constants/colors';
import {ActivityIndicator, Button} from 'react-native';

interface IProp {
  loading: boolean;
  disable?: boolean;
  title: string;
  callBack: () => void;
}

const LoadingButton = ({
  loading = false,
  title = '',
  callBack,
  disable = false,
}: IProp) => {
  return (
    <React.Fragment>
      {!loading ? (
        <Button
          onPress={callBack}
          disabled={disable}
          title={title}
          color={colors.primary}
        />
      ) : (
        <ActivityIndicator />
      )}
    </React.Fragment>
  );
};

export default LoadingButton;
