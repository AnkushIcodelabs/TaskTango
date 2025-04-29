import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../redux/store';
import {loginUser} from '../../../redux/slices/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    if (!email.includes('@')) {
      setEmailError('Email address is not valid');
    }
    if (password.length < 8) {
      setPasswordError('Password length must be 8 characters');
    }
    const params = {
      username: email,
      password: password,
    };
    dispatch(loginUser(params));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your Email"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter your Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navBtn}>
        <Text>
          Forgot Password? <Text style={styles.navText}>Reset</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.navBtn}>
        <Text>
          New User? <Text style={styles.navText}>Signup</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {fontSize: 20, marginHorizontal: 10},
  input: {borderWidth: 1, padding: 10, margin: 10, borderRadius: 5},
  button: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    //marginTop: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    fontWeight: '400',
    textAlign: 'right',
    marginRight: 10,
  },
  navBtn: {justifyContent: 'center', alignItems: 'center', marginTop: 10},
  navText: {color: 'black', fontWeight: '600', textAlign: 'center'},
});
