import React from 'react';
import {SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import {useAppSelector} from '../redux/store';

const HomePage = () => {
  const user = useAppSelector(state => state.auth.user);
  const username = user?.data?.data?.attributes?.profile?.displayName;
  const userImage = user?.data?.included[0]?.attributes?.variants?.default?.url;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{username}</Text>
      <Image style={styles.profileImage} source={{uri: userImage}} />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'orange'},
  profileImage: {height: 100, width: 100, borderRadius: 50},
});
