import React from 'react';
import {SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import {useAppSelector} from '../redux/store';
import {
  displayName,
  firstName,
  lastName,
  profileImage,
} from '../redux/slices/authSlice';

const HomePage = () => {
  const display_Name = useAppSelector(displayName);
  const profile_Image = useAppSelector(profileImage);
  const first_Name = useAppSelector(firstName);
  const last_Name = useAppSelector(lastName);
  return (
    <SafeAreaView style={styles.container}>
      <Text>{first_Name}</Text>
      <Text>{last_Name}</Text>
      <Text>{display_Name}</Text>
      <Image style={styles.profileImage} source={{uri: profile_Image}} />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'orange'},
  profileImage: {height: 100, width: 100, borderRadius: 50},
});
