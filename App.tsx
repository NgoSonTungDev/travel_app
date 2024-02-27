import React from 'react';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigation';
import store from './src/store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
      <Toast position="top" />
    </Provider>
  );
};

export default App;
