import React, {useState} from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {NavigationContainer} from '@react-navigation/native';

const RootNavigator = () => {
  const [user, setUser] = useState(false);
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
