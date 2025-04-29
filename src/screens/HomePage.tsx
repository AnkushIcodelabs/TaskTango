import React from 'react';
import {SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import {useAppSelector} from '../redux/store';

const HomePage = () => {
  const user = useAppSelector(state => state.auth.user);
  console.log('user>>>>>>', JSON.stringify(user));
  const username =
    user?.payload?.payload?.data?.data?.attributes?.profile?.displayName;
  console.log('username', username);
  const userImage =
    user?.payload?.payload?.data?.included[0]?.attributes?.variants?.default
      ?.url;
  // console.log('userImage', userImage);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'orange'}}>
      <Text>{username}</Text>
      <Image
        style={{height: 100, width: 100, borderRadius: 50}}
        source={{uri: userImage}}
      />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
