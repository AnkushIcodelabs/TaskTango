import React, {useEffect, useState} from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {fetchCurrentUser} from '../redux/slices/authSlice';

const RootNavigator = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
