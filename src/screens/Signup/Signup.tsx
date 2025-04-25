import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SignupForm from './components/SignupForm';

const Signup = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SignupForm />
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
