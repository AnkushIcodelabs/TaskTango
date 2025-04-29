import React, {useState} from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from '../redux/store';

const RootNavigator = () => {
  const user = useAppSelector(state => state.auth.user);
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
