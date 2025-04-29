import React from 'react';
import RootNavigation from './src/navigation/RootNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
console.log('first', process.env.REACT_NATIVE_SDK_BASE_URL);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
