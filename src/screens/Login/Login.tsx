import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginForm />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
